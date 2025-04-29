"use client";
import AuthenticationForm from "@/components/authentication-form/authentication-form";
import RegistrationForm from "@/components/registration-form/registration-form";
import React, { useState } from "react";
import styles from "./styles.module.css"

const AuthPage = () => {
  const [isNewAccount, setIsNewAccount] = useState(false)
  return (
    <div className={styles.formContainer}>
      {
        isNewAccount
        ? <RegistrationForm setIsNewAccount = {setIsNewAccount} />
        : <AuthenticationForm setIsNewAccount={setIsNewAccount}/>
      }
    </div>
  );
}

export default AuthPage;
