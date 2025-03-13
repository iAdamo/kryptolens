import { SafeAreaView } from "@/components/ui/safe-area-view";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import MainBar from "@/components/layout/MainBar";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

export default function AdminDashboard() {
  return (
    <SafeAreaView>
      <NavBar />
      <HStack className="p-4 justify-between">
        <VStack className="w-1/5 p-2 rounded-xl">
          <SideBar />
        </VStack>
        <VStack className="w-4/5 p-2 rounded-xl">
          <MainBar />
        </VStack>
      </HStack>
    </SafeAreaView>
  );
}
