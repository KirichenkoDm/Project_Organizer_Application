"use client";

import React, { JSX, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/root-provider";

const PUBLIC_ROUTES = ["/auth"];

function withGuard<P>(Component: React.ComponentType<P>) {
  return function GuardedComponent(props: P & JSX.IntrinsicAttributes) {
    const router = useRouter();
    const pathname = usePathname();
    const store = useStore();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
      if (!store.isAuthenticated && !isPublicRoute) {
        router.replace("/auth");
      }
    }, [store.isAuthenticated, router]);

    if (!store.isAuthenticated && !isPublicRoute) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withGuard;
