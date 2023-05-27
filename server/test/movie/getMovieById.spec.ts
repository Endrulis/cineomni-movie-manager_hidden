import * as pactum from 'pactum';

export const getMovieByIdTest = () => {
  it('should get movie by id', () => {
    return pactum
      .spec()
      .get('/movies/{id}')
      .withPathParams('id', '$S{movieId}')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .expectStatus(302)
      .expectBodyContains('$S{movieId}');
  });
};
