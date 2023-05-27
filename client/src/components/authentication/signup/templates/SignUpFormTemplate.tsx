import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Spinner, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AuthDto } from '../../../../models';
import './sass/SignUpForm.css';

interface SignUpFormProps {
  formData: AuthDto;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  formErrors: { [key: string]: string };
}

export const SignUpFormTemplate: React.FC<SignUpFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  formErrors
}) => {
  return (
    <Container className="signup-form-container">
      <Form onSubmit={handleSubmit} className="signup-form-container__form">
        <Link to="/home" className="signup-form-container__form-link">
          <Card.Text className="signup-form-container__form-text">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="signup-form-container__form-icon"
            />
            Back
          </Card.Text>
        </Link>
        <Form.Group className="signup-form-container__form-group">
          <Form.Label
            htmlFor="email"
            className="signup-form-container__form-label"
          >
            Email
          </Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="signup-form-container__form-control"
          />
          {formErrors.email && (
            <p className="text-red-400">{formErrors.email}</p>
          )}
        </Form.Group>
        <Form.Group className="signup-form-container__form-group">
          <Form.Label
            htmlFor="password"
            className="signup-form-container__form-label"
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="signup-form-container__form-control"
          />
          {formErrors.password && (
            <p className="text-red-400">{formErrors.password}</p>
          )}
        </Form.Group>
        <Button
          type="submit"
          className="signup-form-container__form-button bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            <>Sign Up</>
          )}
        </Button>
      </Form>
    </Container>
  );
};
