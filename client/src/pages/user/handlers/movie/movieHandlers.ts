import { Movie } from '../../../../models';
import {
  deleteMovieById,
  getAllMoviesByCurrentUser,
} from '../../../../services/current-user/CurrentUserService';

export const handleFetchMovies = (
  accessToken: string,
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
) => {
  getAllMoviesByCurrentUser(accessToken)
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
    });
};

export const handleCreateMovie = (
  newMovie: Movie,
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
) => {
  setMovies((prevMovies: Movie[]) => [...prevMovies, newMovie]);
};

export const handleUpdateMovie = (
  updatedMovie: Movie,
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
) => {
  setMovies((prevMovies: Movie[]) =>
    prevMovies.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return { ...updatedMovie };
      }
      return movie;
    }),
  );
};

export const handleDeleteMovie = async (
  accessToken: string,
  movieId: number,
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
) => {
  return deleteMovieById(accessToken, movieId)
    .then(() => {
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId),
      );
    })
    .catch((error) => {
      console.error('Error deleting movie:', error);
    });
};
