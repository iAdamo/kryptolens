"use client";
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
      <VStack className="md:flex-row md:p-4 justify-between">
        <HStack className="md:flex-col md:w-1/5 md:p-2 rounded-xl">
          <SideBar />
        </HStack>
        <VStack className="md:w-4/5 p-2 rounded-xl">
          <MainBar />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
