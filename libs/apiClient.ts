// lib/apiClient.ts
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export async function postRequest<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.post<T>(url, data, config);
  return response.data;
}

export async function getRequest<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.get<T>(url, config);
  return response.data;
}

export async function putRequest<T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.put<T>(url, data, config);
  return response.data;
}

export async function deleteRequest<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.delete<T>(url, config);
  return response.data;
}

export async function patchRequest<T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.patch<T>(url, data, config);
  return response.data;
}

export { axios, AxiosError };
