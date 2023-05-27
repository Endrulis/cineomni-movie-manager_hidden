import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser as GetCurrentUser } from '../auth/common/decorators';
import { JwtGuard } from '../auth/common/guards';
import { User } from '@prisma/client';
import { UpdateCurrentUserDto } from './dto';
import { UserService as CurrentUserService } from './currentUser.service';

@UseGuards(JwtGuard)
@Controller('user')
export class CurrentUserController {
  constructor(private currentUserService: CurrentUserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getCurrentUser(@GetCurrentUser() currentUser: User) {
    return currentUser;
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  updateCurrentUser(
    @GetCurrentUser('id') userId: number,
    @Body() dto: UpdateCurrentUserDto,
  ) {
    return this.currentUserService.updateCurrentUser(userId, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCurrentUser(@GetCurrentUser('id') userId: number) {
    return this.currentUserService.deleteUserById(userId);
  }
}
