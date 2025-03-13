import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import Image from "next/image";

const SideBar = () => {
  return (
    <VStack className="gap-4 p-4 border border-gray-200 rounded-xl h-full">
      <Button
        variant="outline"
        className=" border-none p-0 bg-transparent justify-start data-[hover=true]:bg-blue-400"
      >
        <ButtonIcon />
        <ButtonText className="justify-start">Dashboard</ButtonText>
      </Button>
      <Button
        variant="outline"
        className=" border-none p-0 bg-transparent justify-start data-[hover=true]:bg-blue-400"
      >
        <ButtonIcon />
        <ButtonText>Profile</ButtonText>
      </Button>
      <Button
        variant="outline"
        className=" border-none p-0 bg-transparent justify-start data-[hover=true]:bg-blue-400"
      >
        <ButtonIcon />
        <ButtonText>Settings</ButtonText>
      </Button>
    </VStack>
  );
};

export default SideBar;
