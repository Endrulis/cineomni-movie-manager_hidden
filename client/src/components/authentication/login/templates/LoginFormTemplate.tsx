import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Form, Spinner, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AuthDto } from '../../../../models';
import './sass/LoginFormTemplate.css';

interface LoginFormTemplateProps {
  formData: AuthDto;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  formErrors: { [key: string]: string };
}

export const LoginFormTemplate: React.FC<LoginFormTemplateProps> = ({
  formData,
  handleInputChange: handleInputChange,
  handleSubmit,
  isLoading,
  formErrors,
}) => {
  return (
    <Container className="login-form-container">
      <Form onSubmit={handleSubmit} className="login-form-container__form">
        <Link to="/home" className="login-form-container__form-link">
          <Card.Text className="login-form-container__form-text">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="login-form-container__form-icon"
            />
            Back
          </Card.Text>
        </Link>
        <Form.Group className="login-form-container__form-group">
          <Form.Label
            htmlFor="email"
            className="login-form-container__form-label"
          >
            Email
          </Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="login-form-container__form-control"
          />
          {formErrors.email && (
            <p className="text-red-400">{formErrors.email}</p>
          )}
        </Form.Group>
        <Form.Group className="login-form-container__form-group">
          <Form.Label
            htmlFor="password"
            className="login-form-container__form-label"
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="login-form-container__form-control"
          />
          {formErrors.password && (
            <p className="text-red-400">{formErrors.password}</p>
          )}
        </Form.Group>
        <Button
          type="submit"
          className="login-form-container__form-button bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            <>Login</>
          )}
        </Button>
      </Form>
    </Container>
  );
};
