import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateCurrentUserDto as UpdateCurrentUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateCurrentUser(currentUserId: number, dto: UpdateCurrentUserDto) {
    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    const user = await this.prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        email: dto.email,
        hash: dto.password,
      },
    });
    delete user.hash;
    return user;
  }

  async deleteUserById(currentUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });
    if (!user) throw new ForbiddenException('Invalid ID');
    await this.prisma.user.delete({
      where: {
        id: currentUserId,
      },
    });
  }
}
