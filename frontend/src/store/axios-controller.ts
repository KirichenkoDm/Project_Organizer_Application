import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { parseCookies, setCookie } from "nookies";
import { HomeProjectListItemInstance } from "./models/home-project-list-item";
import { CreateUser } from "@/shared/types/create-user";
import { Credentials } from "@/shared/types/credentials";

const ONE_HOUR = 60*60;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {},
  withCredentials: true,
});

async function sendRefresh(): Promise<string> {
  const response = await axiosInstance.post("/auth/refresh") 
  return response.data.accessToken;
} 

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];



axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log(error);
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if(error.response?.status === 401) {
      const newToken = await sendRefresh()

      setCookie(null, "accessToken", newToken, {
        maxAge: ONE_HOUR,
        path: "/",
      });

      if (originalRequest && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return axiosInstance(originalRequest);
    }
  }
);

class AxiosController {
  // Home Projects List
  async fetchHomeProjects(userId: number): Promise<HomeProjectListItemInstance[]> {
    const accessToken = parseCookies().accessToken;
    const response = await axiosInstance.get(`/project/user/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data
  };

  //User
  async register(userData: CreateUser) {
    const response = await axiosInstance.post("/user", userData);
    return response.data;
  };

  async login(credentials: Credentials) {
    const response = await axiosInstance.post("/auth/login/", credentials);
    return response.data;
  };
}

export default new AxiosController;
