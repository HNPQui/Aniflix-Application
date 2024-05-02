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
    console.log("createUserDto", createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post("check")
  async checkPhoneEmail(@Body('info') info: string) {
    let isExists = await this.usersService.findOne({
      $or: [
        { phone: info },
        { email: info }
      ]
    }).exec();
    return {
      isExists: !!isExists
    }
  }

  @HasRoles(Role.USER)
  @Post("fcm")
  fcm(@Req() req, @Body('device') device_token: string) {
    return this.usersService.fcm(req.user.sub, device_token);
  }

  @HasRoles(Role.USER)
  @Get("point/:point")
  claim(@Req() req, @Param('point') point: number) {
    return this.usersService.claim(req.user.sub, point);
  }

  @HasRoles(Role.USER)
  @Post("reset-password")
  resetPassword(@Req() req, @Body("newPassword") password: string) {
    return this.usersService.update(req.user.sub, {
      password: Buffer.from(password).toString('base64')
    }).select({ password: 0 });
  }

  @HasRoles(Role.USER)
  @Get('me')
  me(@Req() req) {
    return this.usersService.findOne({
      _id: req.user.sub
    });
  }

  @Get("statistics")
  statistics() {
    return this.usersService.statistics();
  }
  
  @Get('become-vip')
  @HasRoles(Role.USER)
  becomeVip(@Req() req) {
    return this.usersService.becomeVip(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }



  @HasRoles(Role.USER)
  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.sub, updateUserDto);
  }
  @HasRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
