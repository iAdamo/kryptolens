import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Pressable } from "@/components/ui/pressable";

const MainBar = () => {
  return (
    <VStack className="w-full h-full rounded-xl gap-4">
      <Card variant="outline" className="h-52">
        <HStack className="justify-between w-full">
          <HStack className="gap-4">
            <VStack>
              <Avatar size="lg" className="bg-[#A2ACC8]">
                <AvatarFallbackText className="">T</AvatarFallbackText>
                <AvatarImage source={{ uri: "" }} />
              </Avatar>
            </VStack>
            <VStack>
              <Text size="sm">Welcome...</Text>
              <Heading size="xl">Boss Bossess</Heading>
            </VStack>
          </HStack>
          <HStack>
            <Button variant="outline" className="rounded-full">
              <ButtonText size="sm">Hide info</ButtonText>
            </Button>
          </HStack>
        </HStack>
        <HStack className="grid grid-cols-5 gap-4 items-center mt-auto">
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">UID</Text>
            <Heading size="xs">18477839</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Identity verification</Text>
            <Heading size="xs">Verified</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Security</Text>
            <Heading size="xs">High</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Time zone</Text>
            <Heading size="xs">UTC +8 Singapore</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Last login</Text>
            <Heading size="xs">13-03-2025 4:34PM</Heading>
          </Card>
        </HStack>
      </Card>
      <HStack className="w-full gap-4">
        <VStack className="w-3/4 gap-4">
          <HStack className="grid grid-cols-2 gap-4">
            <Card variant="outline" className="h-60 gap-4">
              <HStack className="grid grid-cols-3 gap-4 h-12">
                <Button size="sm" variant="outline" className="rounded-full ">
                  <ButtonText size="xs">Buy crypto</ButtonText>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <ButtonText size="xs">Deposit</ButtonText>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <ButtonText size="xs">Withdraw</ButtonText>
                </Button>
              </HStack>
              <Card
                variant="filled"
                className="h-full justify-between bg-[#9F0EF7]"
              >
                <HStack className="h-full">
                  <VStack className="justify-between w-full">
                    <Text>Total asset</Text>
                    <VStack>
                      <Heading>3.434433344BTC</Heading>
                      <Text>$3432334321</Text>
                    </VStack>
                  </VStack>
                  <Image
                    src="/images/line-chart.png"
                    alt="btc"
                    width={100}
                    height={100}
                  />
                </HStack>
              </Card>
            </Card>
            <Card variant="outline" className="h-60">
              <Heading size="sm" className="">
                Deposit or buy crypto through these methods
              </Heading>
              <VStack className=" grid grid-rows-2 gap-2">
                <Card variant="outline" className="">
                  <HStack className="justify-between">
                    <HStack className="gap-2 items-center">
                      <Avatar size="md" className="bg-cyan-500">
                        <AvatarFallbackText className="">T</AvatarFallbackText>
                        <AvatarImage source={{ uri: "" }} />
                      </Avatar>
                      <VStack>
                        <Heading size="xs">Buy Crypto</Heading>
                        <Text size="xs">Local currency payment</Text>
                      </VStack>
                    </HStack>
                    <Button variant="outline" className="rounded-2xl w-8">
                      <ButtonIcon />
                    </Button>
                  </HStack>
                </Card>
                <Card variant="outline">
                  <HStack className="gap-2 items-center">
                    <Avatar size="md" className="bg-yellow-500">
                      <AvatarFallbackText className="">T</AvatarFallbackText>
                      <AvatarImage source={{ uri: "" }} />
                    </Avatar>
                    <VStack>
                      <Heading size="xs">Deposit</Heading>
                      <Text size="xs">Deposit crypto or fiat</Text>
                    </VStack>
                  </HStack>
                </Card>
              </VStack>
            </Card>
          </HStack>
          <Card variant="outline" className="gap-4">
            <HStack className="justify-between">
              <Heading>Market</Heading>
              <Button variant="link">
                <ButtonText size="sm">View more</ButtonText>
              </Button>
            </HStack>
            <HStack className="gap-4">
              <Button size="sm" variant="outline" className="rounded-lg">
                <ButtonText>Favorites</ButtonText>
              </Button>
              <Button size="sm" variant="outline" className="rounded-lg">
                <ButtonText>Hot</ButtonText>
              </Button>
            </HStack>
            <HStack className="grid grid-cols-5 rounded-full bg-[#F3F4F6] p-2 px-auto">
              <Heading size="xs">Coin</Heading>
              <Heading size="xs">Price</Heading>
              <Heading size="xs">24h Change</Heading>
              <Heading size="xs">4h trend</Heading>
              <Heading size="xs">Action</Heading>
            </HStack>
          </Card>
        </VStack>
        <VStack className="w-1/4 gap-4">
          <Card variant="outline" className="h-56"></Card>
          <Card variant="outline" className="h-36"></Card>
          <Card variant="outline" className="h-56"></Card>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default MainBar;
