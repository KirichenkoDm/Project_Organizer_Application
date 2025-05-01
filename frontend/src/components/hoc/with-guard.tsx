"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

const PUBLIC_ROUTES = ["/auth"];

function withGuard<P extends object>(Component: React.ComponentType<P>) {

  return function GuardedComponent(props: P) {
    const pathname = usePathname();
    const userStore = useUserStore();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isGuardPassed, setIsGuardPassed] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient) return;
      
      try {
        const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
        
        if (!userStore.isAuthenticated && !isPublicRoute) {
          console.log(userStore.user)
          router.replace("/auth")
        } else {
          setIsGuardPassed(true);
        }
      } catch (error) {
        console.error("Authentication guard error:", error);
      }
    }, [isClient, pathname]);

    if (!isClient || !isGuardPassed) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withGuard;
