export interface Movie {
  id: number;
  userId: number;
  title: string;
  description?: string;
  link?: string;
  genre?: string;
  releaseDate?: string;
}
