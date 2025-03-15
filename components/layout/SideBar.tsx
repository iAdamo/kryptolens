import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  GlobeIcon,
  GripVerticalIcon,
  HelpCircleIcon,
  InfoIcon,
  DownloadIcon,
  LinkIcon,
} from "@/components/ui/icon";

const SideBar = () => {
  const actions = [
    {
      name: "Dashboard",
      icon: GlobeIcon,
    },
    {
      name: "Security",
      icon: HelpCircleIcon,
    },
    {
      name: "Identity verification",
      icon: InfoIcon,
    },
    {
      name: "API management",
      icon: LinkIcon,
    },
    {
      name: "Sub-accounts",
      icon: GripVerticalIcon,
    },
    {
      name: "Export history",
      icon: DownloadIcon,
    },
  ];
  return (
    <HStack className="hidden md:flex md:flex-col justify-center md:justify-normal flex-wrap gap-4 p-4 border border-gray-200 rounded-xl h-full">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="outline"
          className="border md:border-none items-center justify-center md:p-0 bg-transparent md:justify-start data-[hover=true]:bg-blue-400"
        >
          <ButtonIcon as={action.icon} className="mr-2" />
          <ButtonText className="hidden md:flex justify-start">{action.name}</ButtonText>
        </Button>
      ))}
    </HStack>
  );
};

export default SideBar;
