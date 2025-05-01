"use client"

import { UserInstance } from "@/store/models/user";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { ProfileValidationSchema } from "./profile-validation";
import { useUserStore } from "@/store/user-store";
import InputGroup from "../input-group/input-group";
import { Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import styles from "./profile-info.module.css";
import { EditUser } from "@/shared/types/edit-user";

interface ProfileEditProps {
  user: UserInstance;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEdit: FC<ProfileEditProps> = ({
  user,
  setIsEditMode
}) => {
  const userStore = useUserStore();
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: ""
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const data: EditUser = { ...values };
    if(data.password?.length === 0) {
       delete data.password;
    }
    await userStore.editUser(data);
    setIsEditMode(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form className={styles.profileEditContainer}>
          <InputGroup
            id="firstName"
            type="text"
            touched={touched.firstName}
            errors={errors.firstName}
            label="First Name"
          />

          <InputGroup
            id="lastName"
            type="text"
            touched={touched.lastName}
            errors={errors.lastName}
            label="Last Name"
          />

          <InputGroup
            placeholder="Leave empty if you don't want to change"
            id="password"
            type="password"
            touched={touched.password}
            errors={errors.password}
            label="Password"
          />

          <Flex gap="3" mt="2" justify="end">
            <AppButton type="submit" variant="solid">Save</AppButton>
            <AppButton
              type="button"
              variant="soft"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </AppButton>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileEdit;
