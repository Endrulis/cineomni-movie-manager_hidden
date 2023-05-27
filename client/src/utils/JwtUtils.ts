import { AuthResponse } from '../models/authentication/AuthResponse';

export const parseJwt = (authResponse: AuthResponse) => {
  const access_token = authResponse.access_token;
  if (!access_token) {
    return;
  }
  const base64Url = access_token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
