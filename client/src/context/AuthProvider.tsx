import { createContext, useState, useEffect, ReactNode } from 'react';
import { parseJwt } from '../utils';

interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  getAccessToken: () => string | null;
  saveAccessToken: (accessToken: string) => void;
  deleteAccessToken: () => void;
  isAccessTokenValid: () => boolean;
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const isAccessTokenValid = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return false;
    }

    const parsedAccessToken = parseJwt({
      access_token: JSON.parse(accessToken),
    });
    const currentDate = Math.floor(Date.now() / 1000);

    if (
      currentDate >= parsedAccessToken.iat &&
      currentDate < parsedAccessToken.exp
    ) {
      const tokenNotExpired = Date.now() <= parsedAccessToken.exp * 1000;
      if (tokenNotExpired) {
        return true;
      } else {
        deleteAccessToken();
      }
    }
    return false;
  };

  const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    setAccessToken(accessToken);
    return accessToken ? JSON.parse(accessToken) : null;
  };

  const saveAccessToken = (accessToken: string) => {
    localStorage.setItem('access_token', JSON.stringify(accessToken));
    setAccessToken(accessToken);
  };

  const deleteAccessToken = () => {
    localStorage.removeItem('access_token');
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        getAccessToken: getAccessToken,
        saveAccessToken: saveAccessToken,
        deleteAccessToken: deleteAccessToken,
        isAccessTokenValid: isAccessTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
