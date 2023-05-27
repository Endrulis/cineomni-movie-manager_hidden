import { Movie } from '../../../../models';
import { CreateMovieForm } from '../forms/CreateMovieForm';

type CreateMovieModalProps = {
  handleCreateMovie: (newMovie: Movie) => void;
  toggleCreateMovieForm: () => void;
};

export const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
  handleCreateMovie,
  toggleCreateMovieForm,
}) => (
  <div className="modal">
    <div className="modal-content">
      <CreateMovieForm
        handleCreateMovie={handleCreateMovie}
        toggleCreateMovieForm={toggleCreateMovieForm}
      />
    </div>
  </div>
);
