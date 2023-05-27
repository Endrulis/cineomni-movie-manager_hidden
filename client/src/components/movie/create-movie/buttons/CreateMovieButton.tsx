import { CreateMovieButtonTemplate } from './templates/CreateMovieButtonTemplate';

interface CreateMovieButtonProps {
  toggleCreateMovieForm: () => void;
}

export const CreateMovieButton: React.FC<CreateMovieButtonProps> = ({
  toggleCreateMovieForm,
}) => (
  <CreateMovieButtonTemplate toggleCreateMovieForm={toggleCreateMovieForm} />
);
