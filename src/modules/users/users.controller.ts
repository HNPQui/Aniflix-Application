import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { ObjectId } from 'mongoose';
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
  @Get('test')
  tesst() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateMongoIdPipe) id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: ObjectId) {
    return this.usersService.remove(id);
  }
}
