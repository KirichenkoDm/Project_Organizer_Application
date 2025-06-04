"use client";

import "./globals.css";
import { StoreProvider } from "@/store/root-provider";
import { rootStore } from "@/store/root-store";
import withGuard from "@/components/hoc/with-guard";
import { useEffect } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AppToast from "@/components/app-toast/app-toast";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    rootStore.hydrate();
  })

  return (
    <html lang="en">
      <Head>
        <title>Project Organizer App</title>
      </Head>
      <StoreProvider value={rootStore}>
        <body>
          <Theme accentColor="sky" radius="large">
            <GuardedContent>
                {children}
              <AppToast />
            </GuardedContent>
          </Theme>
        </body>
      </StoreProvider>
    </html>
  );
}

type ChildrenProps = {
  children: React.ReactNode;
};

const ChildrenComponent = ({ children }: ChildrenProps) => <>{children}</>;

const GuardedContent = withGuard(ChildrenComponent);

export default RootLayout 
