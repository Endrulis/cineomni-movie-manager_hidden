import * as pactum from 'pactum';

export const getMoviesTest = () => {
  it('should get movies', () => {
    return pactum
      .spec()
      .get('/movies')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .expectStatus(302)
      .expectJsonLength(1);
  });
};
