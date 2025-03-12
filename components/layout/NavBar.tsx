import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
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
    <VStack className="bg-[#0D061B] px-10 py-4">
      <HStack className="justify-between">
        <HStack className="gap-10 items-center">
          <VStack>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </VStack>
          <HStack className="space-x-10">
            <Link href="/buy-crypto">
              <Text className="text-white">Buy Crypto</Text>
            </Link>
            <Link href="/dashboard/markets">
              <Text className="text-white">Markets</Text>
            </Link>
            <Link href="/dashboard/trade">
              <Text className="text-white">Trade</Text>
            </Link>
            <Link href="/dashboard/derivatives">
              <Text className="text-white">Derivatives</Text>
            </Link>
            <Link href="/dashboard/earn">
              <Text className="text-white">Earn</Text>
            </Link>
            <Link href="/dashboard/more">
              <Text className="text-white">More</Text>
            </Link>
          </HStack>
          <HStack></HStack>
        </HStack>
        <HStack className="space-x-4 items-center justify-end">
          {/** Search */}
          <Input className="hidden md:flex w-2/5 bg-[#170E27] border-none rounded-full">
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
            <Avatar className="bg-[#A2ACC8]">
              <AvatarFallbackText className="">T</AvatarFallbackText>
              <AvatarImage source={{ uri: null }} />
              <AvatarBadge />
            </Avatar>
          </Pressable>
          <Button className="bg-[#466DD0] rounded-full">
            <ButtonText>Add Funds</ButtonText>
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default NavBar;
