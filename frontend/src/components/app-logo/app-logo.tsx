import Link from "next/link";
import React, { FC } from "react";
import styles from "./app-logo.module.css";
import { Heading } from "@radix-ui/themes";

const AppLogo: FC = () => {
  return (
    <Link href="/home">
      <Heading as="h1" className={styles.logo}>Project Organizer APP</Heading>
    </Link>
  )
}

export default AppLogo;
