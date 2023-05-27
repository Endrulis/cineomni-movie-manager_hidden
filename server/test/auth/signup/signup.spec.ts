import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

export const runSignupTests = (dto: AuthDto) => {
  it('should throw if email empty', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody({
        password: dto.password,
      })
      .expectStatus(400);
  });

  it('should throw if password empty', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody({
        email: dto.email,
      })
      .expectStatus(400);
  });

  it('should throw if no body provided', () => {
    return pactum.spec().post('/auth/signup').expectStatus(400);
  });

  it('should signup', () => {
    return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
  });
};
