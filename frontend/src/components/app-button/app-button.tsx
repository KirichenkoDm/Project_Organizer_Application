"use client";

import React, { FC } from "react";
import { Button, ButtonProps } from "@radix-ui/themes";
import styles from "./app-button.module.css";

type AppButtonProps = {
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
} & ButtonProps;

const AppButton: FC<AppButtonProps> = ({
  color = "blue",
  variant = "solid",
  children,
  ...rest
}) => {
  return (
    <Button 
      className={styles.appButton} 
      color={color} 
      variant={variant} 
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
