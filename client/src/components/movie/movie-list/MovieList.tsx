import { useState } from 'react';
import { Movie } from '../../../models';
import { MovieListTemplate } from './templates/MovieListTemplate';
import { MovieListPagination } from './pagination/MovieListPagination';

interface MovieListProps {
  movies: Movie[];
  searchQuery: string;
  handleUpdateMovie: (updatedMovie: Movie) => void;
  handleDeleteMovie: (movieId: number) => void;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  searchQuery,
  handleUpdateMovie,
  handleDeleteMovie,
}) => {
  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const genreMatch =
      movie.genre &&
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const releaseDateMatch =
      movie.releaseDate &&
      movie.releaseDate.toLowerCase().includes(searchQuery.toLowerCase());

    return titleMatch || genreMatch || releaseDateMatch;
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const sortMovies = (movies: Movie[]): Movie[] => {
    if (sortOption === 'title_asc') {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'title_desc') {
      return movies.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'genre_asc') {
      return movies.sort((a, b) =>
        (a.genre || '').localeCompare(b.genre || ''),
      );
    } else if (sortOption === 'genre_desc') {
      return movies.sort((a, b) =>
        (b.genre || '').localeCompare(a.genre || ''),
      );
    } else if (sortOption === 'releaseDate_asc') {
      return movies.sort((a, b) =>
        (a.releaseDate || '').localeCompare(b.releaseDate || ''),
      );
    } else if (sortOption === 'releaseDate_desc') {
      return movies.sort((a, b) =>
        (b.releaseDate || '').localeCompare(a.releaseDate || ''),
      );
    }

    return movies;
  };

  const sortedMovies = sortMovies(filteredMovies);

  const calculateMoviesPerPage = (): number =>
    window.innerWidth < 768 ? 3 : 4;
  const moviesPerPage = calculateMoviesPerPage();

  const calculateIndexes = (
    currentPage: number,
    moviesPerPage: number,
  ): [number, number] => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    return [indexOfFirstMovie, indexOfLastMovie];
  };

  const [indexOfFirstMovie, indexOfLastMovie] = calculateIndexes(
    currentPage,
    moviesPerPage,
  );

  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const openUpdateMovieForm = (movie: Movie) => setSelectedMovie(movie);
  const closeUpdateMovieForm = () => setSelectedMovie(null);

  return (
    <div>
      <MovieListTemplate
        currentMovies={currentMovies}
        selectedMovie={selectedMovie}
        handleUpdateMovie={handleUpdateMovie}
        handleDeleteMovie={handleDeleteMovie}
        closeUpdateMovieForm={closeUpdateMovieForm}
        openUpdateMovieForm={openUpdateMovieForm}
      />
      <div className='flex justify-center items-center'>
        <select
          id="sortSelect"
          className="px-4 mt-4 w-36 h-10 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">None</option>
          <option value="title_asc">Title (A-Z)</option>
          <option value="title_desc">Title (Z-A)</option>
          <option value="genre_asc">Genre (A-Z)</option>
          <option value="genre_desc">Genre (Z-A)</option>
          <option value="releaseDate_asc">Release Date (Asc)</option>
          <option value="releaseDate_desc">Release Date (Desc)</option>
        </select>
        <MovieListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
