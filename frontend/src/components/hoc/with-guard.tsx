"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import AppLoadingPlaceholder from "../app-loading-placeholder/app-loading-placeholder";

const PUBLIC_ROUTES = ["/auth"];

function withGuard<P extends object>(Component: React.ComponentType<P>) {

  function GuardedComponent(props: P) {
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
          console.log("Authentication failed, redirecting to /auth");
          router.push("/auth")
        } else if (userStore.isAuthenticated && pathname === "/auth") {
          router.push("/home");
        } else {
          setIsGuardPassed(true);
        }
      } catch (error) {
        console.error("Authentication guard error:", error);
        router.replace("/auth");
        return;
      }
    }, [isClient, pathname, userStore.user]);

    if (!isClient || !isGuardPassed) {
      return <AppLoadingPlaceholder 
      text="Application is starting up. You will be redirected in a moment..."
      />;
    }

    return <Component {...props} />;
  };

  return observer(GuardedComponent)
}

export default withGuard;
