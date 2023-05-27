import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { UpdateUserDto } from './dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    users.forEach(user => {
      delete user.hash;
    });
    return users;
  }

  getMoviesByUserId(userId: number) {
    return this.prisma.movie.findMany({
      where: {
        userId,
      },
    });
  }

  async updateUserById(userId: number, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        hash: dto.password,
        role: dto.role
      },
    });
    delete user.hash;
    return user;
  }

  async deleteUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Invalid ID');
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
