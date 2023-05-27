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
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/common/guards';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/auth/common/guards/admin/admin.guard';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('movies/:id')
  @HttpCode(HttpStatus.OK)
  getMoviesByUserId(
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.adminService.getMoviesByUserId(userId);
  }


  @Patch('users/:id')
  @HttpCode(HttpStatus.OK)
  updateUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.adminService.updateUserById(userId, dto);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param('id', ParseIntPipe) userId: number,) {
    return this.adminService.deleteUserById(userId);
  }
}
