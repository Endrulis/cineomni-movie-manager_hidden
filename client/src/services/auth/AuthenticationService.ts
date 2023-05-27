import { AuthDto } from '../../models/authentication/AuthDto';
import { buildBearerAccessToken } from '../../utils';
import axiosInstance from '../api/axiosInstance';

export const signUp = async (dto: AuthDto) => {
  const response = await axiosInstance.post('/auth/signup', dto, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const login = async (dto: AuthDto) => {
  const response = await axiosInstance.post('/auth/login', dto, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (accessToken: string | null) => {
  const bearerAccessToken = accessToken
    ? buildBearerAccessToken(accessToken)
    : null;
  const response = await axiosInstance.post(
    '/auth/logout',
    {},
    {
      headers: { Authorization: bearerAccessToken },
      withCredentials: true,
    },
  );
  return response.data;
};

export const refreshTokens = async (userId: number) => {
  const response = await axiosInstance.post(
    '/auth/refresh',
    { userId },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};
