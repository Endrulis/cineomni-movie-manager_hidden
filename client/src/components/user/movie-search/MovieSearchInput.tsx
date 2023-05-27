interface MovieSearchInputProps {
  movieSearchQuery: string;
  handleMovieSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MovieSearchInput = ({
  movieSearchQuery,
  handleMovieSearchChange,
}: MovieSearchInputProps) => {
  return (
    <div className="absolute top-36 my-4">
      <input
        type="text"
        className="px-4 py-2 w-80 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by title, genre, or release date"
        value={movieSearchQuery}
        onChange={handleMovieSearchChange}
      />
    </div>
  );
};
