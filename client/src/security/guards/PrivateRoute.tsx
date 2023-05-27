import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccessToken } from '../../hooks/useAccessToken';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAccessTokenValid } = useAccessToken();
  return isAccessTokenValid() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};
