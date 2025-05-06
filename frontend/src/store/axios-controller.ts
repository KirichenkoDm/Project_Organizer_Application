import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { parseCookies, setCookie } from "nookies";
import { HomeProjectListItemInstance } from "./models/home-project-list-item";
import { CreateUser } from "@/shared/types/create-user";
import { Credentials } from "@/shared/types/credentials";
import { EditUser } from "@/shared/types/edit-user";

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

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if(error.response?.status === 401) {
      const newToken = await sendRefresh()

      setCookie(null, "accessToken", newToken, {
        maxAge: ONE_HOUR,
        path: "/",
      });

      const originalRequest = error.config!;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      return axiosInstance(originalRequest);
    }
  }
);

class AxiosController {
  // Home Projects List
  async fetchHomeProjects(userId: number): Promise<HomeProjectListItemInstance[] | null> {
    const accessToken = parseCookies().accessToken;
    const response = await axiosInstance.get(`/project/user/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data ?? null;
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

  async deleteUser(id: number) {
    const accessToken = parseCookies().accessToken;
    const response = await axiosInstance.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async updateUser(id:number, userData: EditUser) {
    const accessToken = parseCookies().accessToken;
    console.log(accessToken);
    const responce = await axiosInstance.put(`/user/${id}`,
      userData,
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responce.data;
  }
}

export default new AxiosController;
