import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/authentication-guard.service';
import { CreateUserDTO } from './create-user.dto';
import { UserService } from './user.service';

type UserDTO = {
  id: string;
  email: string;
};

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(AuthenticationGuard)
  async createUser(@Body() dto: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.createOne(dto.email, dto.password);
    return { id: user.id, email: user.email };
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  async getUserById(@Param() params: { id: string }): Promise<UserDTO> {
    const user = await this.userService.getById(params.id);
    if (!user) {
      throw new NotFoundException();
    }
    return { id: user.id, email: user.email };
  }
}
