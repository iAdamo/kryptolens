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
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import Link from "next/link";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import Image from "next/image";
import { register, sendCode } from "@/axios/auth";
import VerifyCodeModal from "../VerifyCodeModal";
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

const SignUpModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

  const toast = useToast();
  const router = useRouter();

  // handle form submission
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema.omit({ code: true })),
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
    if (data.password !== data.confirmPassword) {
      toast.show({
        placement: "top",
        duration: 1000,
        render: ({ id }: { id: string }) => {
          return (
            <Toast nativeID={id} variant="outline" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
      setIsLoading(false);
      return;
    } else {
      try {
        const response = await register({
          email: data.email,
          password: data.password,
        });
        if (response) {
          await sendCode({ email: data.email });
          toast.show({
            placement: "top",
            duration: 3000,
            render: ({ id }: { id: string }) => {
              return (
                <Toast nativeID={id} variant="outline" action="success">
                  <ToastTitle>Account created successfully</ToastTitle>
                </Toast>
              );
            },
          });
          setShowVerifyEmailModal(true);
        }
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
    }
  };

  // handle password visibility
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => {
      return !showState;
    });
  };

  // handle form submission on enter key press
  const handleKeyPress = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="">
      <Heading size="2xl">Sign Up</Heading>
      <VStack className="gap-4 pt-8 items-center justify-center w-full h-full">
        {/** Email */}
        <FormControl
          className="w-96"
          isInvalid={!!errors?.email || !validated.emailValid}
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
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
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
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
        {/* ------------------------------------------ Confirm Password -------------------------------------------*/}
        <FormControl className="w-96" isInvalid={!!errors.confirmPassword}>
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="confirmPassword"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await FormSchema.parseAsync({
                    confirmPassword: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-12">
                <InputField
                  className="text-sm"
                  placeholder="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showConfirmPassword ? "text" : "password"}
                />

                <InputSlot
                  onPress={handleConfirmPasswordState}
                  className="pr-3"
                >
                  <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.confirmPassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        {/* ----------------------------------- Sign Up Button ------------------------------------------ */}
        <VStack className="gap-2">
          <Button
            isDisabled={isLoading}
            className="w-96 h-12 bg-btn-primary hover:bg-btn-secondary active:bg-brand-primary"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>{isLoading ? "Loading..." : "Sign Up"}</ButtonText>
          </Button>
        </VStack>
        <Text className="text-md text-text-secondary">
          Already have an account?
          <Button onPress={() => router.push("/auth/signin")} variant="link" className="inline">
            <ButtonText className="text-md ml-2 text-brand-primary underline hover:text-brand-secondary">
              Sign In Here
            </ButtonText>
          </Button>
        </Text>
      </VStack>

      {showVerifyEmailModal && (
        <VerifyCodeModal
          email={getValues("email")}
          isOpen={showVerifyEmailModal}
          onClose={() => setShowVerifyEmailModal(false)}
        />
      )}
    </VStack>
  );
};

export default SignUpModal;
