import { flow, getRoot, types } from "mobx-state-tree";
import axios from "axios";
import { useStore } from "./root-provider";
import { HomeProjectListItem } from "./models/home-project-list-item";
import AxiosController from "./axios-controller";
import { RootStoreInstance } from "./root-instance";

export const HomeProjectsStore = types
  .model("HomeProjectsStore", {
    homeProjects: types.maybe(types.array(HomeProjectListItem)),

  })
  .actions((self) => {
    const actions = {
      getHomeProjects: flow(function* (userId: number) {
        self.homeProjects = yield AxiosController.fetchHomeProjects(userId);
      }),

    };

    return actions;
  });

export const useHomeProjectsStore = () => {
  return useStore().homeProjectsStore;
}