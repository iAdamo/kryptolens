import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kryptolens | SignIn",
};

import SignInModal from "@/screens/auth/signin";

export default function SignInPage() {
  return <SignInModal />;
}
