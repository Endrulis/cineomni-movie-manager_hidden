import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import './sass/CreateMovieButtonTemplate.css';
import { Container, Button } from 'react-bootstrap';

interface CreateMovieButtonTemplateProps {
  toggleCreateMovieForm: () => void;
}

export const CreateMovieButtonTemplate: React.FC<
  CreateMovieButtonTemplateProps
> = ({ toggleCreateMovieForm: toggleCreateMovieForm }) => (
  <Container className="create-movie-button-template mr-4">
    <Button
      onClick={toggleCreateMovieForm}
      className="create-movie-button-template__button bg-blue-700"
    >
      <FontAwesomeIcon
        icon={faCirclePlus}
        beat
        className="create-movie-button-template__icon"
      />
      Add Movie
    </Button>
  </Container>
);
