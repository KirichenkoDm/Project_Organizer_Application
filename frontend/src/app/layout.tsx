"use client";

import "./globals.css";
import { StoreProvider } from "@/store/root-provider";
import { rootStore } from "@/store/root-store";
import withGuard from "@/components/hoc/with-guard";
import { useEffect } from "react";


function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    rootStore.hydrate();
  }, [])
  
  return (
    <html lang="en">
      <StoreProvider value={rootStore}>
        <body>
        <GuardedContent>{children}</GuardedContent>
        </body>
      </StoreProvider>
    </html>
  );
}

type ChildrenProps = {
  children: React.ReactNode;
};

// Создаем компонент с явной типизацией
const ChildrenComponent = ({ children }: ChildrenProps) => <>{children}</>;

const GuardedContent = withGuard(ChildrenComponent);

export default RootLayout 
