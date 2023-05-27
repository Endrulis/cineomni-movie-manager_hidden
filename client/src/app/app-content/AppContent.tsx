import { useState, useEffect } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

import {
  AuthenticationPage,
  SignUpPage,
  HomePage,
  IntroPage,
  CurrentUserPage,
  LogoutPage,
} from '../../pages';
import { AppContentTemplate } from './AppContentTemplate';
import { useAccessToken } from '../../hooks/useAccessToken';
import { refreshTokenInterceptor } from '../../middleware/refreshTokenInterceptor';
import { Navbar } from '../../components/navbar/Navbar';
import { PrivateRoute } from '../../security/guards/PrivateRoute';
import { AdminPage } from '../../pages/admin/AdminPage';

export const AppContent = () => {
  const AccessToken = useAccessToken();

  const [videoLoaded, setVideoLoaded] = useState(false);
  const location = useLocation();

  const videoRoutes = [
    '/home',
    '/signup',
    '/login',
    '/logout',
    '/admin',
    '/user',
    '/',
  ];
  const shouldLoadVideo = videoRoutes.includes(location.pathname);

  useEffect(() => {
    refreshTokenInterceptor(AccessToken);
  }, [AccessToken]);

  useEffect(() => {
    if (!shouldLoadVideo) {
      setVideoLoaded(true);
    }
  }, [shouldLoadVideo]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <Navbar />
      <AppContentTemplate
        shouldLoadVideo={shouldLoadVideo}
        videoLoaded={videoLoaded}
        handleVideoLoad={handleVideoLoad}
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <LogoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <CurrentUserPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<IntroPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </AppContentTemplate>
    </>
  );
};
