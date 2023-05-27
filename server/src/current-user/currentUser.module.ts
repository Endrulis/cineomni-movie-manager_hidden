import { Module } from '@nestjs/common';
import { CurrentUserController } from './currentUser.controller';
import { UserService as CurrentUserService } from './currentUser.service';

@Module({
  controllers: [CurrentUserController],
  providers: [CurrentUserService],
})
export class CurrentUserModule {}
