"use client"

import { useStore } from "@/store/root-provider";
import { Toast } from "radix-ui";
import React, { FC } from "react";

const AppToast: FC = () => {
  const error = useStore().getError;

  return (
    <Toast.Provider>
      <Toast.Root className="ToastRoot" open={!!error} onOpenChange={() => { }}>
        <Toast.Title className="ToastTitle">{error}</Toast.Title>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green">Close</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}

export default AppToast;