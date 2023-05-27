import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/common/guards';
import { MovieService } from './movie.service';
import { GetCurrentUser } from '../auth/common/decorators';
import { CreateMovieDto, UpdateMovieDto } from './dto';

@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getMovies(@GetCurrentUser('id') userId: number) {
    return this.movieService.getMovies(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getMovieById(
    @GetCurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.movieService.getMovieById(userId, movieId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMovie(
    @GetCurrentUser('id') userId: number,
    @Body() dto: CreateMovieDto,
  ) {
    return this.movieService.createMovie(userId, dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateMovieById(
    @GetCurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovieById(userId, movieId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMovieById(
    @GetCurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.movieService.deleteMovieById(userId, movieId);
  }
}
