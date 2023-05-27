import { useState } from 'react';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import { MoviePayload, Movie } from '../../../../models';
import { createMovie } from '../../../../services/current-user/CurrentUserService';
import { CreateMovieFormTemplate } from './templates/CreateMovieFormTemplate';

interface CurrentUserPageProps {
  handleCreateMovie: (newMovie: Movie) => void;
  toggleCreateMovieForm: () => void;
}

export const CreateMovieForm: React.FC<CurrentUserPageProps> = ({
  handleCreateMovie,
  toggleCreateMovieForm,
}) => {
  const AccessToken = useAccessToken();

  const [formData, setFormData] = useState<MoviePayload>({
    title: '',
    description: '',
    link: '',
    genre: '',
    releaseDate: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const accessToken = AccessToken.getAccessToken();
      if (accessToken) {
        const response = await createMovie(accessToken, formData);
        handleCreateMovie(response.data);
        toggleCreateMovieForm();
      }
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  return (
    <CreateMovieFormTemplate
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      toggleCreateMovieForm={toggleCreateMovieForm}
    />
  );
};
