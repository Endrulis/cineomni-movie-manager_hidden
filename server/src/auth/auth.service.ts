import {
  ForbiddenException,
  Injectable,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types';
import { Response } from 'express';
import { createJwtPayload } from './helpers/createJwtPayload';
import { USER_ROLE } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const createUser = this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
        role: USER_ROLE,
      },
    });
    return createUser.then(() => {
      return {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
      };
    });
  }

  async login(dto: AuthDto, response: Response): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    const accessToken = await this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const refreshToken = await this.generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );

    await this.updateRefreshTokenHash(user.id, refreshToken);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return accessToken;
  }

  async logout(userId: number, response: Response) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    response.clearCookie('refresh_token');
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
    response: Response,
  ): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches)
      throw new ForbiddenException('Refresh token malformed');
    const newAccessToken = await this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const newRefreshToken = await this.generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );
    await this.updateRefreshTokenHash(user.id, newRefreshToken);
    response.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return newAccessToken;
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await argon.hash(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }

  async generateAccessToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    const jwtPayload: JwtPayload = createJwtPayload(userId, email, role);
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });
    return accessToken;
  }

  async generateRefreshToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    const jwtPayload: JwtPayload = createJwtPayload(userId, email, role);
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
