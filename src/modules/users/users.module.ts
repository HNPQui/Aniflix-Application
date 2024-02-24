import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Import the MongooseModule to use the schema for the users collection
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // MongooseModule.forFeature([{ name : 'User', schema:UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
