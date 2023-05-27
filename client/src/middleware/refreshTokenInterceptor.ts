import { HttpStatusCode } from 'axios';
import axiosInstance from '../services/api/axiosInstance';
import { buildBearerAccessToken, parseJwt } from '../utils';
import { refreshTokens } from '../services/auth/AuthenticationService';

interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  getAccessToken: () => string | null;
  saveAccessToken: (accessToken: string) => void;
  deleteAccessToken: () => void;
}

export const refreshTokenInterceptor = (AccessToken: AuthContextProps) => {
  let isRefreshing = false;
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.status === HttpStatusCode.Unauthorized &&
        !isRefreshing
      ) {
        isRefreshing = true;
        const expiredAccessToken = AccessToken.getAccessToken();
        const userId: number = parseJwt({
          access_token: expiredAccessToken,
        }).sub;

        return refreshTokens(userId)
          .then((newAccessToken) => {
            AccessToken.saveAccessToken(newAccessToken);

            const originalRequest = error.config;
            originalRequest.headers.Authorization =
              buildBearerAccessToken(newAccessToken);

            return axiosInstance(originalRequest);
          })
          .catch((refreshError) => {
            window.location.href = '/login';
            throw refreshError;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return Promise.reject(error);
    },
  );
};
