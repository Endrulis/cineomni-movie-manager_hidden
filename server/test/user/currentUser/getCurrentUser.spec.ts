import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

export const getCurrentUserTest = (dto: AuthDto) => {
  it('should get current user', () => {
    return pactum
      .spec()
      .get('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .expectStatus(302);
  });
};
