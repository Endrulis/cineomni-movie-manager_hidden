import * as pactum from 'pactum';
import { CreateMovieDto } from 'src/movie/dto';

export const createMovieTest = (dto: CreateMovieDto) => {
  it('should create movie', () => {
    return pactum
      .spec()
      .post('/movies')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .withBody(dto)
      .expectStatus(201)
      .stores('movieId', 'id');
  });
};
