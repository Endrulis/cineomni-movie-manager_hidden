import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CurrentUserModule } from './current-user/currentUser.module';
import { MovieModule } from './movie/movie.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CurrentUserModule,
    MovieModule,
    AdminModule,
  ],
})
export class AppModule {}
