import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { parseCookies, setCookie } from "nookies";
import { HomeProjectListItemInstance } from "./models/home-project-list-item";
import { CreateUser } from "@/shared/types/create-user";
import { Credentials } from "@/shared/types/credentials";
import { EditUser } from "@/shared/types/edit-user";
import { CreateProject } from "@/shared/types/create-project";
import { COOKIE_ACCESS_TOKEN_KEY } from "@/shared/constants";
import { headers } from "next/headers";

const ONE_HOUR = 60 * 60;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 400) {
      return error.response.data;
    }
    if (error.response?.status === 401) {
      const data = await AxiosController.sendRefresh();

      setCookie(
        null,
        COOKIE_ACCESS_TOKEN_KEY,
        data.accessToken,
        {
          maxAge: ONE_HOUR,
          path: "/",
        }
      );

      const originalRequest = error.config!;
      originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

      return axiosInstance(originalRequest);
    }
  }
);

interface generatorParams {
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
  query?: Record<string, any>,
  withAuth: boolean
}

class AxiosController {
  private static async request<T>({
    method,
    url,
    data,
    query,
    withAuth = true
  }: generatorParams): Promise<T> {
    const accessToken = withAuth ? parseCookies()[COOKIE_ACCESS_TOKEN_KEY] : undefined;

    const headers: Record<string, string> = {};
    if (withAuth && accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params: query,
      headers,
    }

    const responce = await axiosInstance.request<T>(config);
    return responce.data;
  }

  static async get<T>(url: string, query?: Record<string, any>, withAuth = true) {
    return await this.request<T>({ method: 'get', url, query, withAuth });
  }
  
  static async post<T>(url: string, data?: any, withAuth = true) {
    return await this.request<T>({ method: 'post', url, data, withAuth });
  }
  
  static async put<T>(url: string, data?: any, withAuth = true) {
    return await this.request<T>({ method: 'put', url, data, withAuth });
  }
  
  static async delete<T>(url: string, withAuth = true) {
    return await this.request<T>({ method: 'delete', url, withAuth });
  }

  static async sendRefresh() {
    const response = await axiosInstance.post("/auth/refresh") 
    return response.data;
  } 
}

export default AxiosController;
