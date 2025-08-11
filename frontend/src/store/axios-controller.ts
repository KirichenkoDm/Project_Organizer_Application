import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { parseCookies, setCookie } from "nookies";
import { COOKIE_ACCESS_TOKEN_KEY } from "@/shared/constants";
import { AccessTokenBody } from "@/shared/types/access-token";

const ONE_HOUR = 60 * 60;

// let wasRetry: boolean = false;
const retryTracker = new Map<string, boolean>();

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.config.url) {
      retryTracker.delete(response.config.url);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 400) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      const requestKey = error.config?.url || 'unknown';
      if (retryTracker.get(requestKey)) {
        console.log("Retry does not help for:", requestKey);
        retryTracker.delete(requestKey);
        return Promise.reject(error);
      }

      retryTracker.set(requestKey, true);
      try {
        console.log("Refreshing token for:", requestKey);
        const accessToken = await AxiosController.sendRefresh();

        if (!accessToken) {
          console.log("Failed to refresh token");
          retryTracker.delete(requestKey);
          return Promise.reject(error);
        }

        setCookie(
          null,
          COOKIE_ACCESS_TOKEN_KEY,
          accessToken,
          {
            maxAge: ONE_HOUR,
            path: "/",
          }
        );

        const originalRequest = error.config!;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        retryTracker.delete(requestKey);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error during token refresh");
        retryTracker.delete(requestKey);
        return Promise.reject(error);
      }
    }
    return error.response?.data;
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

    const response = await axiosInstance.request<T>(config);
    return response.data;
  }

  static async get<T>(
    url: string,
    query: Record<string, any> = {},
    withAuth = true
  ): Promise<T> {
    return await this.request<T>({ method: 'get', url, query, withAuth });
  }

  static async post<T>(
    url: string,
    query: Record<string, any> = {},
    data: any = undefined,
    withAuth = true
  ): Promise<T> {
    return await this.request<T>({ method: 'post', url, query, data, withAuth });
  }

  static async put<T>(
    url: string,
    query: Record<string, any> = {},
    data: any = undefined,
    withAuth = true
  ): Promise<T> {
    return await this.request<T>({ method: 'put', url, query, data, withAuth });
  }

  static async delete<T>(
    url: string,
    query: Record<string, any> = {},
    withAuth = true
  ): Promise<T> {
    return await this.request<T>({ method: 'delete', url, query, withAuth });
  }

  static async sendRefresh() {
    const response: AccessTokenBody = await this.post<AccessTokenBody>(
      "/auth/refresh",
      undefined,
      undefined,
      false
    )
    if (response) {
      return response.accessToken;
    }
    return "";
  }
}

export default AxiosController;
