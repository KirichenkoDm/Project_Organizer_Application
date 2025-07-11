"use client";

import { createContext, useContext } from "react";
import { rootStore } from "./root-store";
import { Instance } from "mobx-state-tree";

const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export const StoreProvider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if(store === null) {
    throw new Error("Store cannot be null, add a context provider");
  }
  return store;
}
