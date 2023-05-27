import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtGuard } from './common/guards';
import { GetCurrentUser } from './common/decorators';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return this.authService.login(dto, response);
  }

  @UseGuards(JwtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(
    @GetCurrentUser('id') userId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(userId, response);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @Body() payload: { userId: number },
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const refreshToken = request.cookies.refresh_token;
    if (!refreshToken) {
      throw new Error(`Refresh token not found`);
    }
    return this.authService.refreshTokens(
      payload.userId,
      refreshToken,
      response,
    );
  }
}
