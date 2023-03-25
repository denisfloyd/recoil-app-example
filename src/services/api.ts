import axios, { AxiosInstance } from 'axios';

export function setupAPIClient(): AxiosInstance {
  const api = axios.create({
    baseURL: 'https://fakestoreapi.com/',
  });

  return api;
}

export const api = setupAPIClient();
