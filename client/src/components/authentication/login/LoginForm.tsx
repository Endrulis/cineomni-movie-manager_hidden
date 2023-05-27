import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginFormTemplate } from './templates/LoginFormTemplate';
import { login } from '../../../services/auth/AuthenticationService';
import { AuthDto } from '../../../models';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { parseJwt } from '../../../utils';
import { emailRegex, passwordRegex } from '../../../constants';

export const LoginForm = () => {
  const AccessToken = useAccessToken();

  const [formData, setFormData] = useState<AuthDto>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors: Partial<AuthDto> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!formData.email.match(emailRegex)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (
      !formData.password.match(passwordRegex) ||
      formData.password.length < 8
    ) {
      errors.password =
        'Password must contain at least 8 characters with at least one letter and one digit';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      login(formData)
        .then((response: string) => {
          AccessToken.saveAccessToken(response);
          parseJwt({ access_token: response }).role === 'admin'
            ? navigate('/admin')
            : navigate('/user');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <LoginFormTemplate
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formErrors={formErrors}
    />
  );
};
