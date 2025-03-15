import { useState } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "@/components/forms/AuthFormSchema";
import { Toast, useToast, ToastTitle } from "@/components/ui/toast";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import Link from "next/link";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import Image from "next/image";
import ForgotPasswordModal from "@/screens/auth/ForgetPassword";
import { useSession } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type ControllerRenderType = {
  field: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
  };
};

interface ValidatedState {
  emailValid: boolean;
  passwordValid: boolean;
}

interface RenderProps {
  id: string;
}

const SignInModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { login } = useSession();
  const toast = useToast();
  const router = useRouter();

  // handle form submission
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(
      FormSchema.omit({ confirmPassword: true, code: true })
    ),
  });

  // handle form validation
  const [validated, setValidated] = useState<ValidatedState>({
    emailValid: true,
    passwordValid: true,
  });

  // handle form submission
  const onSubmit = async (data: FormSchemaType) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await login(data);
      setIsLoading(false);
    } catch (error) {
      setValidated({ emailValid: false, passwordValid: false });
      toast.show({
        placement: "top",
        duration: 5000,
        render: ({ id }: RenderProps) => {
          return (
            <Toast nativeID={id} variant="outline" action="error">
              <ToastTitle>
                {(error as any).response?.data?.message ||
                  "An unexpected error occurred"}
              </ToastTitle>
            </Toast>
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // handle password visibility
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  // handle form submission on enter key press
  const handleKeyPress = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="">
      <Heading size="2xl">Sign In</Heading>

      <VStack className="gap-6 items-center pt-14 justify-center w-full h-full">
        {/** Email */}
        <FormControl
          className="w-96"
          isInvalid={!!errors?.email || !validated.emailValid}
        >
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async (value: string) => {
                try {
                  await FormSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({
              field: { onChange, onBlur, value },
            }: ControllerRenderType) => (
              <Input className="h-12">
                <InputField
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  className=""
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.email?.message || !validated.emailValid}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        {/** Password */}
        <FormControl
          className=" w-96"
          isInvalid={!!errors.password || !validated.passwordValid}
        >
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await FormSchema.parseAsync({ password: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({
              field: { onChange, onBlur, value },
            }: ControllerRenderType) => (
              <Input className="h-12">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  className=""
                />
                <InputSlot onPress={handleState} className="pr-3">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.password?.message || !validated.passwordValid}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <VStack className="gap-2">
          <Button
            variant="link"
            onPress={() => setShowForgotPasswordModal(true)}
            className="ml-auto"
          >
            <ButtonText className="text-md text-text-secondary text-end underline hover:text-brand-primary">
              Forget Password
            </ButtonText>
          </Button>
          <Button
            isDisabled={isLoading}
            className="w-96 h-12 bg-btn-primary hover:bg-btn-secondary active:bg-brand-primary"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>{isLoading ? "Loading..." : "Sign in"}</ButtonText>
          </Button>
        </VStack>
        <Text className="text-md text-text-secondary">
          Don&apos;t have an account yet?
          <Button onPress={() => router.replace("/auth/signup")} variant="link" className="inline">
            <ButtonText className="text-md ml-2 text-brand-primary underline hover:text-brand-secondary">
              Sign Up Here
            </ButtonText>
          </Button>
        </Text>
      </VStack>
      

      {/** Forgot password modal */}
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
        />
      )}
    </VStack>
  );
};

export default SignInModal;
