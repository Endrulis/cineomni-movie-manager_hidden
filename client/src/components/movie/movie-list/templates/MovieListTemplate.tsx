import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UpdateMovieForm } from '../../update-movie/UpdateMovieForm';
import { Movie } from '../../../../models';

import './sass/MovieListTemplate.css';

interface MovieListTemplateProps {
  currentMovies: Movie[];
  selectedMovie: Movie | null;
  handleUpdateMovie: (updatedMovie: Movie) => void;
  handleDeleteMovie: (movieId: number) => void;
  closeUpdateMovieForm: () => void;
  openUpdateMovieForm: (movie: Movie) => void;
}
export const MovieListTemplate: React.FC<MovieListTemplateProps> = ({
  currentMovies,
  selectedMovie,
  handleUpdateMovie,
  handleDeleteMovie,
  closeUpdateMovieForm,
  openUpdateMovieForm,
}) => {
  return (
    <div className="movie-list">
      {currentMovies.map((movie) => (
        <div key={movie.id} className="movie-list__card">
          <h3 className="movie-list__card-title">{movie.title}</h3>
          {movie.description !== '' && (
            <p className="movie-list__card-description">{movie.description}</p>
          )}
          {movie.genre !== '' && (
            <p className="movie-list__card-genre">Genre: {movie.genre}</p>
          )}
          {movie.releaseDate !== '' && (
            <p className="movie-list__card-release-date">
              Release Date: {movie.releaseDate}
            </p>
          )}
          {movie.link !== '' && (
            <a
              href={movie.link}
              className="movie-list__card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to the movie
            </a>
          )}
          <div className="movie-list__card-buttons">
            <Button
              className="movie-list__card-buttons-update bg-blue-600"
              onClick={() => openUpdateMovieForm(movie)}
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
            </Button>
            <Button
              className="movie-list__card-buttons-delete bg-red-600"
              onClick={() => handleDeleteMovie(movie.id)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
            </Button>
          </div>
        </div>
      ))}
      {selectedMovie && (
        <UpdateMovieForm
          handleUpdateMovie={handleUpdateMovie}
          closeUpdateMovieForm={closeUpdateMovieForm}
          selectedMovie={selectedMovie}
        />
      )}
    </div>
  );
};
