"use client";
import AuthenticationForm from "@/components/authentication-form/authentication-form";
import RegistrationForm from "@/components/registration-form/registration-form";
import React, { useState } from "react";
import styles from "./auth.module.css"
import { Box } from "@radix-ui/themes";

const AuthPage = () => {
  const [isNewAccount, setIsNewAccount] = useState(false)
  return (
    <Box className={styles.formContainer}>
      {
        isNewAccount
        ? <RegistrationForm setIsNewAccount = {setIsNewAccount} />
        : <AuthenticationForm setIsNewAccount={setIsNewAccount}/>
      }
    </Box>
  );
}

export default AuthPage;
