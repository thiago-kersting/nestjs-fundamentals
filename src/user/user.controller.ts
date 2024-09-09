import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

// assim pega em todos do controller
// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async show(@ParamId() id) {
    return this.userService.show(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id) {
    return this.userService.update(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id) {
    return this.userService.updatePartial(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteOne(@ParamId() id) {
    return this.userService.delete(id);
  }
}
