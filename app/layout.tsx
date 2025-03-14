"use client";
import StyledJsxRegistry from "./registry";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from "@/context/AuthContext";
import NavTab from "@/components/layout/NavTab";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen m-0 p-0">
        <StyledJsxRegistry>
          <GluestackUIProvider mode="light">
            <SessionProvider>
              {children}
              <NavTab />
            </SessionProvider>
          </GluestackUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
