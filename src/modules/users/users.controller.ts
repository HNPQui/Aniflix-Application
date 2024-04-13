import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { Types } from 'mongoose';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HasRoles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @HasRoles(Role.USER)
  @Get()
  claim(@Req() req) {
    return this.usersService.claim(req.user._id);
  }

  @HasRoles(Role.USER)
  @Get('me')
  me(@Req() req) {
    return this.usersService.findOne({
      _id: req.user.sub
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }


  @HasRoles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @HasRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
