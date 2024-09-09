import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  // Dependency injection for PrismaService in constructor
  constructor(private readonly prisma: PrismaService) {}

  // Method to create a new user with email, name, and password
  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: {
        id,
      },
    });
  }
  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = password;
    }
  
    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O Usuário com id ${id} não existe.`);
    }
  }
}
