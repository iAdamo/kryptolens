import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kryptolens | SignUp",
};

import SignUpModal from "@/screens/auth/signup";

export default function SignUpPage() {
  return <SignUpModal />;
}
