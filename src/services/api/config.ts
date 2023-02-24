import { StorageKey } from '../storage';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  tokenStorageKey: StorageKey;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: process.env.REACT_APP_API_URL ?? '',
  timeout: 30000,
  tokenStorageKey: 'AUTH_TOKEN',
};

export const ADMIN_API_CONFIG: ApiConfig = {
  baseURL: process.env.REACT_APP_API_URL ?? '',
  timeout: 30000,
  tokenStorageKey: 'ADMIN_AUTH_TOKEN',
};
