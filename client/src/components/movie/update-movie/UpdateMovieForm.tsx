import { useState } from 'react';
import { Movie, MoviePayload } from '../../../models';
import { updateMovieById } from '../../../services/current-user/CurrentUserService';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { UpdateMovieFormTemplate } from './templates/UpdateMovieFormTemplate';

interface MovieListProps {
  handleUpdateMovie: (updatedMovie: Movie) => void;
  closeUpdateMovieForm: () => void;
  selectedMovie: Movie | null;
}
export const UpdateMovieForm: React.FC<MovieListProps> = ({
  handleUpdateMovie,
  closeUpdateMovieForm,
  selectedMovie,
}) => {
  const AccessToken = useAccessToken();
  const [formData, setFormData] = useState<MoviePayload>({
    title: selectedMovie ? selectedMovie.title : '',
    description: selectedMovie?.description,
    link: selectedMovie?.link,
    genre: selectedMovie?.genre,
    releaseDate: selectedMovie?.releaseDate,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const accessToken = AccessToken.getAccessToken();
      if (accessToken && selectedMovie) {
        const response = await updateMovieById(
          accessToken,
          selectedMovie.id,
          formData,
        );
        handleUpdateMovie(response.data);
      }
      closeUpdateMovieForm();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };
  return (
    <UpdateMovieFormTemplate
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      closeUpdateMovieForm={closeUpdateMovieForm}
    />
  );
};
