import * as pactum from 'pactum';

export const deleteMovieByIdTest = () => {
  it('should delete movie', () => {
    return pactum
      .spec()
      .delete('/movies/{id}')
      .withPathParams('id', '$S{movieId}')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .expectStatus(204);
  });
};
