"use client";

import { useStore } from "@/store/root-provider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({children}: AuthGuardProps) => {
  const router = useRouter()
  const store = useStore();

  useEffect(() => {
    if(!store.isAuthenticated) {
      router.replace("/auth");
    }
  }, [store.isAuthenticated, router]);

  if(!store.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
