import { MoviePayload } from '../../../../../models';
import { FaFilm, FaTimes } from 'react-icons/fa';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import './sass/CreateMovieFormTemplate.sass';

interface CreateMovieFormProps {
  formData: MoviePayload;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  toggleCreateMovieForm: () => void;
}
export const CreateMovieFormTemplate: React.FC<CreateMovieFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  toggleCreateMovieForm,
}) => {
  return (
    <Form className="create-movie-form" onSubmit={handleSubmit}>
      <Form.Group className="create-movie-form__field">
        <Form.Label htmlFor="title" className="create-movie-form__label">
          Title:
        </Form.Label>
        <Form.Control
          id="title"
          className="create-movie-form__input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="create-movie-form__field">
        <Form.Label htmlFor="description" className="create-movie-form__label">
          Description:
        </Form.Label>
        <Form.Control
          id="description"
          className="create-movie-form__input"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="create-movie-form__field">
        <Form.Label htmlFor="link" className="create-movie-form__label">
          Link:
        </Form.Label>
        <Form.Control
          id="link"
          className="create-movie-form__input"
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="create-movie-form__field">
        <Form.Label htmlFor="genre" className="create-movie-form__label">
          Genre:
        </Form.Label>
        <Form.Control
          id="genre"
          className="create-movie-form__input"
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="create-movie-form__field">
        <Form.Label htmlFor="releaseDate" className="create-movie-form__label">
          Release Date:
        </Form.Label>
        <Form.Control
          id="releaseDate"
          className="create-movie-form__input"
          type="text"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
        />
      </Form.Group>
      <ButtonGroup className="create-movie-form__buttons">
        <Button
          className="create-movie-form__buttons-create bg-blue-500"
          type="submit"
        >
          <FaFilm className="create-movie-form__buttons-icon" />
          Create
        </Button>
        <Button
          className="create-movie-form__buttons-cancel bg-red-500"
          type="button"
          onClick={toggleCreateMovieForm}
        >
          <FaTimes className="create-movie-form__buttons-icon" />
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};
