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
import { Button, ButtonIcon } from "@/components/ui/button";
import {
  FavouriteIcon,
  GlobeIcon,
  GripVerticalIcon,
  HelpCircleIcon,
  InfoIcon,
  DownloadIcon,
  LinkIcon,
} from "@/components/ui/icon";

const NavTab = () => {
  const tabs = [
    {
      name: "Home",
      icon: GlobeIcon,
    },
    {
      name: "Market",
      icon: FavouriteIcon,
    },
    {
      name: "Portfolio",
      icon: GripVerticalIcon,
    },
    {
      name: "pro",
      icon: DownloadIcon,
    },
    {
      name: "Futures",
      icon: LinkIcon,
    },
  ];
  return (
    <HStack className="md:hidden bg-white justify-between px-4 py-2 border-t border-gray-200 sticky bottom-0">
      {tabs.map((tab) => (
        <Button
          key={tab.name}
          variant="outline"
          className="border-none items-center justify-center bg-transparent"
        >
          <ButtonIcon as={tab.icon} className="" />
        </Button>
      ))}
    </HStack>
  );
};

export default NavTab;
