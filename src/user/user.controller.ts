import { UserDTO } from '@backend/domain';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/authentication-guard.service';
import { CreateUserDTO } from './create-user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(AuthenticationGuard)
  async createUser(@Body() dto: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.createOne(dto.email, dto.password);
    return user.toDTO();
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  async getUserById(@Param() params: { id: string }): Promise<UserDTO> {
    const user = await this.userService.getById(params.id);
    return user.toDTO();
  }
}
