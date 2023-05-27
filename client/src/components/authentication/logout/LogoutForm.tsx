import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth/AuthenticationService';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { LogoutFormTemplate } from './templates/LogoutFormTemplate';
export const LogoutForm = () => {
  const AccessToken = useAccessToken();

  const navigate = useNavigate();

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout(AccessToken.getAccessToken() ?? null)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        navigate('/login');
      });
    AccessToken.deleteAccessToken();
  };

  const handleGoBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <LogoutFormTemplate
      handleLogout={handleLogout}
      handleGoBackButtonClick={handleGoBackButtonClick}
    />
  );
};
