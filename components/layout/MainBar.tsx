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
    setInrValue(parseFloat(coinValue) * conversionRate * marketData[0]?.current_price);
  }, [coinValue, conversionRate, marketData]);

  const handleSave = () => {
    setEditCoin(false);
    setInrValue(parseFloat(coinValue) * conversionRate * marketData[0]?.current_price);
  };

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
            <Button size="sm" variant="outline" className="rounded-full">
              <ButtonText size="sm">Hide info</ButtonText>
              {""}
              <ButtonIcon as={EyeIcon} />
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
                            onChange={(e) => setCoinValue(e.target.value)}
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
          </HStack>
          <Card variant="outline" className="gap-4">
            <HStack className="justify-between">
              <Heading>Market</Heading>
              <Button variant="link">
                <ButtonText size="md">View more</ButtonText>
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
                      <TableData>{parseFloat(data.price_change_percentage_24h.toString()).toFixed(2)}%</TableData>
                      <TableData>
                        <Button
                          size="xs"
                          variant="outline"
                          className="rounded-full"
                        >
                          <ButtonText>Trade</ButtonText>
                          <ButtonIcon as={ChevronDownIcon}/>
                        </Button>
                      </TableData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
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