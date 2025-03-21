import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import Link from "next/link";
import Image from "next/image";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export const NavBar = () => {
  return (
    <VStack className="md:border-b px-2 md:px-10 md:py-4 py-2">
      <HStack className="md:justify-between">
        <HStack className="gap-10 items-center">
          <VStack>
            <Image src="/assets/logo.png" alt="logo" width={80} height={80} />
          </VStack>
          <HStack className="hidden md:flex space-x-10">
            <Link href="/buy-crypto">
              <Text className="">Buy Crypto</Text>
            </Link>
            <Link href="/dashboard/markets">
              <Text className="">Markets</Text>
            </Link>
            <Link href="/dashboard/trade">
              <Text className="">Trade</Text>
            </Link>
            <Link href="/dashboard/derivatives">
              <Text className="">Derivatives</Text>
            </Link>
            <Link href="/dashboard/earn">
              <Text className="">Earn</Text>
            </Link>
            <Link href="/dashboard/more">
              <Text className="">More</Text>
            </Link>
          </HStack>
          <HStack></HStack>
        </HStack>
        <HStack className="ml-auto justify-between space-x-4 items-center">
          {/** Search */}
          <Input className="hidden md:flex w-2/5 bg-background-100 border-none rounded-full">
            <InputField
              type="text"
              placeholder="Search..."
              className="bg-transparent text-text-primary"
            />

            <InputSlot className="pr-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>
          <Pressable className="">
            <Avatar size="sm" className="bg-[#A2ACC8]">
              <AvatarFallbackText className="">T</AvatarFallbackText>
              <AvatarImage source={{ uri: "" }} />
              <AvatarBadge />
            </Avatar>
          </Pressable>
          <Button size="xs" className="bg-[#466DD0] rounded-full">
            <ButtonText>Add Funds</ButtonText>
          </Button>
        </HStack>
      </HStack>

    </VStack>
  );
};

export default NavBar;
