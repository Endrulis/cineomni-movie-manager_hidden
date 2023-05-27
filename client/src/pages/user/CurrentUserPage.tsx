import { useEffect, useState } from 'react';
import {
  CreateMovieButton,
  CreateMovieModal,
  MovieList,
} from '../../components/movie';
import { Movie } from '../../models';
import { useAccessToken } from '../../hooks/useAccessToken';
import {
  handleFetchMovies,
  handleCreateMovie,
  handleUpdateMovie,
  handleDeleteMovie,
} from './handlers';
import { User } from '../../models/current-user/User';
import { UpdateCurrentUserDto } from '../../models/current-user/UpdateCurrentUserDto';
import {
  deleteCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from '../../services/current-user/CurrentUserService';
import { useNavigate } from 'react-router-dom';
import { OpenCurrentUserProfileModalButton } from '../../components/user/buttons/OpenCurrentUserProfileModalButton';
import { MovieSearchInput } from '../../components/user/movie-search/MovieSearchInput';
import { CurrentUserProfileModal } from '../../components/user/modals/profile/CurrentUserProfileModal';
import { DeleteCurrentUserConfirmationModal } from '../../components/user/modals/profile/delete-confirmation/DeleteCurrentUserConfirmationModal';
import { Container } from 'react-bootstrap';
import { emailRegex, passwordRegex } from '../../constants';

export const CurrentUserPage = () => {
  const navigate = useNavigate();

  const AccessToken = useAccessToken();
  const accessToken = AccessToken.getAccessToken();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isCreateMovieFormOpen, setCreateMovieFormOpen] = useState(false);
  const [movieSearchQuery, setMovieSearchQuery] = useState('');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCurrentUserProfileOpen, setCurrentUserProfile] = useState(false);
  const [isDeleteCurrentUserModalOpen, setDeleteCurrentUserConfirmationModal] =
    useState(false);

  const [updateCurrentUserFormData, setUpdateCurrentUserFormData] =
    useState<UpdateCurrentUserDto>({
      email: '',
      password: '',
    });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors: Partial<UpdateCurrentUserDto> = {};

    if (!updateCurrentUserFormData.email) {
      errors.email = 'Email is required';
    } else if (!updateCurrentUserFormData.email.match(emailRegex)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!updateCurrentUserFormData.password) {
      errors.password = 'Password is required';
    } else if (
      !updateCurrentUserFormData.password.match(passwordRegex) ||
      updateCurrentUserFormData.password.length < 8
    ) {
      errors.password =
        'Password must contain at least 8 characters with at least one letter and one digit';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchCurrentUser = async () => {
    if (!accessToken) {
      console.error('Access token is missing.');
      return Promise.reject(new Error('Access token is missing.'));
    }
    return getCurrentUser(accessToken)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [accessToken]);

  useEffect(() => {
    if (currentUser) {
      setUpdateCurrentUserFormData({
        email: currentUser.email,
        password: '',
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const callHandleFetchMovies = async () => {
      if (accessToken) {
        handleFetchMovies(accessToken, setMovies);
      }
    };
    callHandleFetchMovies();
  }, [accessToken]);

  const openCurrentUserProfileModal = () => {
    setCurrentUserProfile(true);
  };
  const closeCurrentUserProfileModal = () => {
    setCurrentUserProfile(false);
    if (currentUser) {
      setUpdateCurrentUserFormData({
        email: currentUser.email,
        password: '',
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCurrentUserFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdateCurrentUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      if (accessToken && currentUser) {
        const { email, password } = updateCurrentUserFormData;
        const updatedUserDto = { email, password };
        updateCurrentUser(accessToken, updatedUserDto)
          .then(() => {
            closeCurrentUserProfileModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDeleteUser = async () => {
    const accessToken = AccessToken.getAccessToken();
    if (!accessToken) {
      console.error('Access token is missing.');
      return Promise.reject(new Error('Access token is missing.'));
    }
    return deleteCurrentUser(accessToken)
      .then(() => {
        AccessToken.deleteAccessToken();
        setCurrentUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const callHandleCreateMovie = (newMovie: Movie) => {
    handleCreateMovie(newMovie, setMovies);
  };

  const callHandleUpdateMovie = (updatedMovie: Movie) => {
    handleUpdateMovie(updatedMovie, setMovies);
  };

  const callHandleDeleteMovie = (movieId: number) => {
    if (accessToken) {
      handleDeleteMovie(accessToken, movieId, setMovies);
    }
  };

  const toggleCreateMovieForm = () => {
    setCreateMovieFormOpen(!isCreateMovieFormOpen);
  };

  const handleMovieSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMovieSearchQuery(event.target.value);
  };

  return (
    <>
      <Container className="relative flex justify-center">
        <CreateMovieButton toggleCreateMovieForm={toggleCreateMovieForm} />
        <OpenCurrentUserProfileModalButton
          openCurrentUserProfileModal={openCurrentUserProfileModal}
        />
        <MovieSearchInput
          movieSearchQuery={movieSearchQuery}
          handleMovieSearchChange={handleMovieSearchChange}
        />
      </Container>
      {isCurrentUserProfileOpen && (
        <CurrentUserProfileModal
          closeCurrentUserProfileModal={closeCurrentUserProfileModal}
          handleUpdateCurrentUserSubmit={handleUpdateCurrentUserSubmit}
          updateCurrentUserFormData={updateCurrentUserFormData}
          handleInputChange={handleInputChange}
          setDeleteUserProfileConfirmation={
            setDeleteCurrentUserConfirmationModal
          }
          formErrors={formErrors}
        />
      )}
      {isDeleteCurrentUserModalOpen && (
        <DeleteCurrentUserConfirmationModal
          handleDeleteUser={handleDeleteUser}
          setDeleteCurrentUserConfirmationModal={
            setDeleteCurrentUserConfirmationModal
          }
        />
      )}
      {isCreateMovieFormOpen && (
        <CreateMovieModal
          handleCreateMovie={callHandleCreateMovie}
          toggleCreateMovieForm={toggleCreateMovieForm}
        />
      )}
      <MovieList
        movies={movies}
        searchQuery={movieSearchQuery}
        handleUpdateMovie={callHandleUpdateMovie}
        handleDeleteMovie={callHandleDeleteMovie}
      />
    </>
  );
};
