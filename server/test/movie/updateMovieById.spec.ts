import * as pactum from 'pactum';
import { UpdateMovieDto } from 'src/movie/dto';

export const updateMovieByIdTest = (dto: UpdateMovieDto) => {
  it('should update movie', () => {
    return pactum
      .spec()
      .patch('/movies/{id}')
      .withPathParams('id', '$S{movieId}')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .withBody(dto)
      .expectStatus(200)
      .expectBodyContains(dto.title)
      .expectBodyContains(dto.description);
  });
};
