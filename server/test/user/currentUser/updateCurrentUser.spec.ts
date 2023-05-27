import * as pactum from 'pactum';
import { UpdateCurrentUserDto } from 'src/current-user/dto';

export const updateCurrentUserTest = (
  updateCurrentUserDto: UpdateCurrentUserDto,
) => {
  it('should update current user', () => {
    return pactum
      .spec()
      .patch('/user')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
      .withBody(updateCurrentUserDto)
      .expectStatus(200)
      .expectBodyContains(updateCurrentUserDto.email);
  });
};
