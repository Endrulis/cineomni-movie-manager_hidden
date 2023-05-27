import React from 'react';
import { MoviePayload } from '../../../../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import './sass/UpdateMovieFormTemplate.css';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

interface UpdateMovieFormTemplateProps {
  formData: MoviePayload;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  closeUpdateMovieForm: () => void;
}

export const UpdateMovieFormTemplate: React.FC<
  UpdateMovieFormTemplateProps
> = ({ formData, handleInputChange, handleSubmit, closeUpdateMovieForm }) => {
  return (
    <Form onSubmit={handleSubmit} className="update-movie-form">
      <Form.Group className="update-movie-form__field">
        <Form.Label htmlFor="title" className="update-movie-form__field-label">
          Title:
        </Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="update-movie-form__field-input"
        />
      </Form.Group>
      <Form.Group className="update-movie-form__field">
        <Form.Label
          htmlFor="description"
          className="update-movie-form__field-label"
        >
          Description:
        </Form.Label>
        <Form.Control
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="create-movie-form__input"
        />
      </Form.Group>
      <Form.Group className="update-movie-form__field">
        <Form.Label htmlFor="link" className="update-movie-form__field-label">
          Link:
        </Form.Label>
        <Form.Control
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          className="create-movie-form__input"
        />
      </Form.Group>
      <Form.Group className="update-movie-form__field">
        <Form.Label htmlFor="genre" className="update-movie-form__field-label">
          Genre:
        </Form.Label>
        <Form.Control
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="create-movie-form__input"
        />
      </Form.Group>
      <Form.Group className="update-movie-form__field">
        <Form.Label
          htmlFor="releaseDate"
          className="update-movie-form__field-label"
        >
          Release Date:
        </Form.Label>
        <Form.Control
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
          className="create-movie-form__input"
        />
      </Form.Group>
      <ButtonGroup className="update-movie-form__buttons">
        <Button
          type="submit"
          className=" update-movie-form__buttons-update bg-blue-500"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="update-movie-form__buttons-icon"
          />
          Update
        </Button>
        <Button
          className=" update-movie-form__buttons-cancel bg-red-500"
          type="button"
          onClick={closeUpdateMovieForm}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="update-movie-form__buttons-icon"
          />
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};
