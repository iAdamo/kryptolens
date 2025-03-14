import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";

const SideBar = () => {
  const actions = [
    {
      name: "Dashboard",
      icon: "DashboardIcon",
    },
    {
      name: "Security",
      icon: "ProfileIcon",
    },
    {
      name: "Identity verification",
      icon: "SettingsIcon",
    },
    {
      name: "API management",
      icon: "PaymentIcon",
    },
    {
      name: "Sub-accounts",
      icon: "SettingsIcon",
    },
    {
      name: "Export history",
      icon: "NotificationIcon",
    },
  ];
  return (
    <VStack className="gap-4 p-4 border border-gray-200 rounded-xl h-full">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="outline"
          className="border-none p-0 bg-transparent justify-start data-[hover=true]:bg-blue-400"
        >
          <ButtonText className="justify-start">{action.name}</ButtonText>
        </Button>
      ))}
    </VStack>
  );
};

export default SideBar;
