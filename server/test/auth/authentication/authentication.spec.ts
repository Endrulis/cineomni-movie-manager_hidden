import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

export const runAuthenticationTests = (dto: AuthDto) => {
  it('should throw if email empty', () => {
    return pactum
      .spec()
      .post('/auth/login')
      .withBody({
        password: dto.password,
      })
      .expectStatus(400);
  });

  it('should throw if password empty', () => {
    return pactum
      .spec()
      .post('/auth/login')
      .withBody({
        email: dto.email,
      })
      .expectStatus(400);
  });

  it('should throw if no body provided', () => {
    return pactum.spec().post('/auth/login').expectStatus(400);
  });

  it('should signin', () => {
    return pactum
      .spec()
      .post('/auth/login')
      .withBody(dto)
      .expectStatus(200)
      .stores('accessToken', 'access_token');
  });
};
