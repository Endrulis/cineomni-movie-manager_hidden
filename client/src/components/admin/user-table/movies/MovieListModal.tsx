import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Movie } from '../../../../models';
import { Button } from 'react-bootstrap';

import './sass/MovieListModal.css';

interface MovieListModalProps {
  movies: Movie[];
  searchMovieQuery: string;
  handleMovieSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closePopup: () => void;
  moviesPerPage: number;
  currentMoviesPage: number;
  goToPage: (pageNumber: number) => void;
}

export const MovieListModal: React.FC<MovieListModalProps> = ({
  movies,
  searchMovieQuery,
  handleMovieSearchChange,
  closePopup,
  moviesPerPage,
  currentMoviesPage,
  goToPage,
}) => {
  const filteredMovies: Movie[] = movies.filter((movie) => {
    const titleMatch = movie.title
      .toLowerCase()
      .includes(searchMovieQuery.toLowerCase());

    const genreMatch =
      movie.genre &&
      movie.genre.toLowerCase().includes(searchMovieQuery.toLowerCase());

    const releaseDateMatch =
      movie.releaseDate &&
      movie.releaseDate.toLowerCase().includes(searchMovieQuery.toLowerCase());

    return titleMatch || genreMatch || releaseDateMatch;
  });

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const startIndex = (currentMoviesPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  return (
    <>
      <div className="modal-container">
        <div className="modal-container__content">
          <div className="modal-container__header">
            <h2 className="modal-container__title text-white">
              Movies
            </h2>
            <div className="modal-container__search">
              <input
                type="text"
                value={searchMovieQuery}
                onChange={handleMovieSearchChange}
                placeholder="Search movies..."
                className="modal-container__search-input"
              />
            </div>
            <Button
              className="modal-container__close-button"
              onClick={closePopup}
            >
              <FontAwesomeIcon
                className="modal-container__close-icon"
                icon={faTimes}
              />
              Close
            </Button>
          </div>
          <div className="modal-container__movie">
            {paginatedMovies.map((movie) => (
              <div
                key={movie.id}
                className="modal-container__movie-card"
              >
                <h3 className="modal-container__movie-title">
                  {movie.title}
                </h3>
                <p className="modal-container__movie-description">
                  {movie.description}
                </p>
                <p className="modal-container__movie-genre">
                  Genre: {movie.genre}
                </p>
                <p className="modal-container__movie-release-date">
                  Release Date: {movie.releaseDate}
                </p>
                <a
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-container__movie-link"
                >
                  Watch Now
                </a>
              </div>
            ))}
          </div>
          <div className="modal-container__pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                className={`modal-container__pagination-button ${
                  currentMoviesPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => goToPage(index + 1)}
              > 
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
