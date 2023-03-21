import axios, { AxiosInstance } from 'axios';

export function setupAPIClient(): AxiosInstance {
  const api = axios.create({
    baseURL: import.meta.env.VITE_FAKE_STORE_API_URL,
  });

  return api;
}

export const api = setupAPIClient();
