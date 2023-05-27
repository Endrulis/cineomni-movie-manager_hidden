import { useEffect } from 'react';
import { useState } from 'react';
import { NavbarTemplate } from './templates/NavbarTemplate';
import { useAccessToken } from '../../hooks/useAccessToken';
import { getCurrentUser } from '../../services/current-user/CurrentUserService';

export const Navbar = () => {
  const AccessToken = useAccessToken();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [navLinks, setNavLinks] = useState<{ text: string; to: string }[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = AccessToken.getAccessToken();
      let isAuthenticated = false;
      let isAdmin = false;

      if (accessToken) {
        try {
          const response = await getCurrentUser(accessToken);
          const user = response.data;
          isAuthenticated = user !== null;
          isAdmin = user?.role === 'admin';
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
      setNavLinks(
        isAuthenticated
          ? [
              { text: 'home', to: '/home' },
              {
                text: 'dashboard',
                to: isAdmin ? '/admin' : '/user',
              },
              { text: 'logout', to: '/logout' },
            ]
          : [
              { text: 'home', to: '/home' },
              { text: 'login', to: '/login' },
              { text: 'signup', to: '/signup' },
            ],
      );
    };

    fetchCurrentUser();
  }, [AccessToken]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarTemplate
      isMenuOpen={isMenuOpen}
      handleMenuClick={handleMenuClick}
      navLinks={navLinks}
    />
  );
};
