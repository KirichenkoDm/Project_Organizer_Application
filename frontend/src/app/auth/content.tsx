"use client";
import AuthenticationForm from "@/components/authentication-form/authentication-form";
import RegistrationForm from "@/components/registration-form/registration-form";
import React, { useState } from "react";
import styles from "./auth.module.css"
import { Box } from "@radix-ui/themes";
import { useUserStore } from "@/store/user-store";
import AppLoadingPlaceholder from "@/components/app-loading-placeholder/app-loading-placeholder";
import Head from "next/head";
import { observer } from "mobx-react-lite";

const AuthContent = observer(() => {
  const [isNewAccount, setIsNewAccount] = useState(false);
  const isAuthenticated = useUserStore().isAuthenticated;

  if (isAuthenticated) {
    return (<AppLoadingPlaceholder
      text="Cheking active session..."
    />)
  }

  return (
    <Box className={styles.formContainer}>
      {
        isNewAccount
          ? <RegistrationForm setIsNewAccount={setIsNewAccount} />
          : <AuthenticationForm setIsNewAccount={setIsNewAccount} />
      }
    </Box>
  );
})

export default AuthContent;
