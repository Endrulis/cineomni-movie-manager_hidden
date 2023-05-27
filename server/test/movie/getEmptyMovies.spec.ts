import * as pactum from 'pactum';

export const getEmptyMoviesTest = () => {
  it('should get movies', () => {
    return pactum
      .spec()
      .get('/movies')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .expectStatus(302)
      .expectBody([]);
  });
};
