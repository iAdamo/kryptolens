"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/AuthContext";


const App = () => {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/signin");
    }
  }, [session, router]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
