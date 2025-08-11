"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import AppLoadingPlaceholder from "../app-loading-placeholder/app-loading-placeholder";

const PUBLIC_ROUTES = ["/auth"];
type AuthGuardState = 'loading' | 'authenticated' | 'unauthenticated' | 'error';
function withGuard<P extends object>(Component: React.ComponentType<P>) {

  function GuardedComponent(props: P) {
    const pathname = usePathname();
    const userStore = useUserStore();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isGuardPassed, setIsGuardPassed] = useState(false);

    const [guardState, setGuardState] = useState<AuthGuardState>('loading');
    const [error, setError] = useState<string | null>(null);

    const isPublicRoute = useCallback(() => {
      return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
    }, [pathname]);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient) return;

      const performAuthCheck = async () => {

        try {
          await new Promise(resolve => setTimeout(resolve, 200));
          const isPublic = isPublicRoute();
          const isAuth = userStore.isAuthenticated;

          if (!isAuth && !isPublic) {
            console.log("Authentication failed, redirecting to /auth");
            setGuardState('unauthenticated');
            router.replace("/auth");
            return;
          }

          if (isAuth && pathname === "/auth") {
            console.log("User already authenticated, redirecting to /home");
            router.replace("/home");
            return;
          }

          setGuardState('authenticated');
        } catch (error) {
          console.error("Authentication guard error:", error);
          setError(error instanceof Error ? error.message : 'Unknown authentication error');
          setGuardState('error');
          if (!isPublicRoute()) {
            router.replace("/auth");
          }
        }
      }
      performAuthCheck();
    }, [isClient, pathname, userStore.isAuthenticated, userStore.user, router, isPublicRoute]);

    useEffect(() => {
      if (guardState === 'error' && error) {
        console.error('Auth Guard Error:', error);
        //Place to call toast
      }
    }, [guardState, error]);

    if (!isClient) {
      return <AppLoadingPlaceholder
        text="Checking authentication status..."
      />;
    }

    if (guardState === 'error') {
      return <AppLoadingPlaceholder
        text="Authentication error occurred. Redirecting..."
      />;
    }

    if (guardState === 'unauthenticated' || guardState === 'authenticated') {
      const shouldShowComponent =
        (guardState === 'authenticated') ||
        (guardState === 'unauthenticated' && isPublicRoute());

      if (shouldShowComponent) {
        return <Component {...props} />;
      }

      return <AppLoadingPlaceholder
        text="Redirecting..."
      />;
    }

    // Fallback
    return <AppLoadingPlaceholder
      text="Loading..."
    />;
  };

  GuardedComponent.displayName = `withGuard(${Component.displayName || Component.name || 'Component'})`;

  return observer(GuardedComponent)
}

export default withGuard;
