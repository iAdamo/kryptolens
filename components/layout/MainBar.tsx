import React, { useEffect, useState } from "react";
import axios from "axios";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableData,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, ChevronDownIcon, ArrowUpIcon } from "@/components/ui/icon";
import { bitcoin } from "@/public/assets/dashboard";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
// Define the interface for market data
interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

const MainBar = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [editCoin, setEditCoin] = useState<boolean>(false);
  const [coinValue, setCoinValue] = useState<string>("3.434433344");
  const [inrValue, setInrValue] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(0);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get<MarketData[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setMarketData(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        setConversionRate(response.data.rates.INR);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchMarketData();
    fetchConversionRate();
  }, []);

  useEffect(() => {
    setInrValue(
      parseFloat(coinValue) * conversionRate * marketData[0]?.current_price
    );
  }, [coinValue, conversionRate, marketData]);

  const handleSave = () => {
    setEditCoin(false);
    setInrValue(
      parseFloat(coinValue) * conversionRate * marketData[0]?.current_price
    );
  };

  return (
    <VStack className="w-full h-full rounded-xl gap-4">
      <Card variant="outline" className="md:h-52 gap-10 md-gap-0">
        <HStack className="justify-between w-full">
          <HStack className="gap-4">
            <VStack>
              <Avatar size={"md"} className="bg-[#A2ACC8]">
                <AvatarFallbackText className="">T</AvatarFallbackText>
                <AvatarImage source={{ uri: "" }} />
              </Avatar>
            </VStack>
            <VStack>
              <Text className="text-sm md:text-md">Welcome...</Text>
              <Heading size="md" className="md:text-3xl">
                Dhanush Kumar
              </Heading>
            </VStack>
          </HStack>
          <HStack>
            <Button size="xs" variant="outline" className="rounded-full">
              <ButtonText size="sm" className="hidden md:inline">
                Hide info
              </ButtonText>
              <ButtonIcon as={EyeIcon} />
            </Button>
          </HStack>
        </HStack>
        <HStack className="grid md:grid-cols-5 grid-cols-2 gap-4 items-center md:mt-auto">
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">UID</Text>
            <Heading className="text-xs md:text-md">18477839</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Identity verification</Text>
            <Heading className="text-xs md:text-md">Verified</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Security</Text>
            <Heading className="text-xs md:text-md">High</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Time zone</Text>
            <Heading className="text-xs md:text-md">UTC +8 Singapore</Heading>
          </Card>
          <Card variant="outline" className="h-16 p-2 justify-between">
            <Text size="xs">Last login</Text>
            <Heading className="text-xs md:text-md">13-03-2025 4:34PM</Heading>
          </Card>
        </HStack>
      </Card>
      <VStack className="md:flex-row w-full gap-4">
        <VStack className="md:w-3/4 gap-4">
          <VStack className="md:flex-row md:grid md:grid-cols-2 gap-4">
            <Card variant="outline" className="h-60 gap-4">
              <HStack className="grid grid-cols-3 gap-4 h-12">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-1"
                >
                  <ButtonText size="xs">Buy crypto</ButtonText>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-1"
                >
                  <ButtonText size="xs">Deposit</ButtonText>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-1"
                >
                  <ButtonText size="xs">Withdraw</ButtonText>
                </Button>
              </HStack>
              <Card
                variant="filled"
                className="h-full justify-between bg-indigo-500"
              >
                <HStack className="h-full justify-between">
                  <VStack className="justify-between w-3/5">
                    <Text className="text-white">Total asset</Text>
                    <VStack className="gap-1">
                      {editCoin ? (
                        <Input>
                          <InputField
                            placeholder="Enter Text here..."
                            value={coinValue}
                            onChange={(e) =>
                              setCoinValue(
                                (e.target as unknown as HTMLInputElement).value
                              )
                            }
                            onBlur={handleSave}
                          />
                        </Input>
                      ) : (
                        <Pressable onPress={() => setEditCoin(true)}>
                          <Heading className="text-white">
                            {coinValue} BTC
                          </Heading>
                        </Pressable>
                      )}
                      <Text className="text-white">₹{inrValue.toFixed(2)}</Text>
                    </VStack>
                  </VStack>
                  <Image src={bitcoin} alt="btc" width={120} height={80} />
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl px-2"
                    >
                      <ButtonIcon as={ArrowUpIcon} className="rotate-45" />
                    </Button>
                  </HStack>
                </Card>
                <Card variant="outline" className="">
                  <HStack className="justify-between">
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl px-2"
                    >
                      <ButtonIcon as={ArrowUpIcon} className="rotate-45" />
                    </Button>
                  </HStack>
                </Card>
              </VStack>
            </Card>
          </VStack>
          <Card variant="outline" className="gap-4">
            <HStack className="justify-between">
              <Heading size="md">Market</Heading>
              <Button size="sm" variant="link">
                <ButtonText>View more</ButtonText>
                <ButtonIcon as={ArrowUpIcon} className="rotate-45" />
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
            <Box className="rounded-lg overflow-auto w-full h-80">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b-0 rounded-lg bg-background-50">
                    <TableHead>Coin</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>4h trend</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((data, index) => (
                    <TableRow
                      key={index}
                      className="border-b-0 rounded-lg  bg-background-50 mb-10"
                    >
                      <TableData>
                        <HStack className="gap-2 items-center ">
                          <Avatar size="md" className="">
                            <AvatarFallbackText className="">
                              {data.name.slice(0, 1)}
                            </AvatarFallbackText>
                            <AvatarImage source={{ uri: data.image }} />
                          </Avatar>
                          <VStack>
                            <Heading size="xs">{data.name}</Heading>
                            <Text size="xs">{data.symbol.toUpperCase()}</Text>
                          </VStack>
                        </HStack>
                      </TableData>
                      <TableData>${data.current_price}</TableData>
                      <TableData>
                        {parseFloat(
                          data.price_change_percentage_24h.toString()
                        ).toFixed(2)}
                        %
                      </TableData>
                      <TableData>
                        {parseFloat(
                          data.price_change_percentage_24h.toString()
                        ).toFixed(2)}
                        %
                      </TableData>
                      <TableData>
                        <Button
                          size="xs"
                          variant="outline"
                          className="rounded-full"
                        >
                          <ButtonText>Trade</ButtonText>
                          <ButtonIcon as={ChevronDownIcon} />
                        </Button>
                      </TableData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </VStack>
        <VStack className="md:w-1/3 gap-4">
          <Card variant="outline" className="md:h-56 gap-2">
            <HStack className="justify-between">
              <Button size="sm" variant="link">
                <ButtonText className="data-[hover=true]:no-underline">
                  VIP Lv. 1
                </ButtonText>
              </Button>
              <Button size="xs" variant="link" className="">
                <ButtonText>View more</ButtonText>
                <ButtonIcon as={ArrowUpIcon} className="rotate-45" />
              </Button>
            </HStack>
            <HStack className="justify-between">
              <Card variant="filled">
                <Text size="sm" className="">
                  Spot fee rate
                </Text>
                <HStack>
                  <Text size="sm" className="">
                    0.22%
                  </Text>
                  <Divider orientation="vertical" className="mx-2" />
                  <Text size="sm" className="">
                    0.25%
                  </Text>
                </HStack>
              </Card>
              <Card variant="filled">
                <Text size="sm" className="">
                  Spot fee rate
                </Text>
                <HStack>
                  <Text size="sm" className="">
                    0.22%
                  </Text>
                  <Divider orientation="vertical" className="mx-2" />
                  <Text size="sm" className="">
                    0.25%
                  </Text>
                </HStack>
              </Card>
            </HStack>
            <VStack className="items-start justify-start gap-1">
              <Button size="sm" variant="link" className="w-32">
                <ButtonText className="data-[hover=true]:no-underline">
                  KLS holdings
                </ButtonText>
                <ButtonIcon as={ChevronDownIcon} />
              </Button>
              <Progress value={40} size="md" orientation="horizontal">
                <ProgressFilledTrack />
              </Progress>
              <HStack space="md">
                <Text size="xs">Lv.7</Text>
                <Text size="xs">
                  Increase your KLS holdings by 1000KLS to upgrade to the next
                  level
                </Text>
                <Text size="xs">Lv.7</Text>
              </HStack>
            </VStack>
          </Card>
          <Card variant="outline" className="md:h-36">
            <HStack space="md" className="justify-between">
              <VStack space="md" className="items-start justify-start">
                <Heading size="xs">Kryptolens Affiliate Program</Heading>
                <Text size="xs" className="pr-8">
                  Invite friends and get 20% commission
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  className="rounded-full w-1/2"
                >
                  <ButtonText>Apply Now</ButtonText>
                </Button>
              </VStack>
              <VStack className="justify-center items-center">
                <Avatar size={"lg"} className="bg-[#A2ACC8]">
                  <AvatarFallbackText className="">T</AvatarFallbackText>
                  <AvatarImage source={{ uri: "" }} />
                </Avatar>
              </VStack>
            </HStack>
          </Card>
          <Card variant="outline" className="h-56">
            <HStack className="justify-between">
              <Heading size="xs">Information</Heading>
              <Button size="xs" variant="link">
                <ButtonText>View more</ButtonText>
                <ButtonIcon as={ArrowUpIcon} className="rotate-45" />
              </Button>
            </HStack>
            <VStack>
              <Card variant="outline"></Card>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default MainBar;
