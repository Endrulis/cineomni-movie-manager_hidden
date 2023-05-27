import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export const useAccessToken = () => {
  return useContext(AuthContext);
};
