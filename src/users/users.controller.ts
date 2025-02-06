import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body('email') email: string, @Body('password') password: string, @Body('name') name: string) {
    //     return this.usersService.create(email, password, name);
    // }
    @Post()
    @ResponseMessage('Create a new user')
    create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
        return this.usersService.create(createUserDto, user);
    }

    @Get()
    // @UseGuards(TestGuard)
    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { limit: 4, ttl: 60000 } })
    @ResponseMessage('Fetch user with paginate')
    findAll(@Query('page') currentPage: string, @Query('limit') limit: string, @Query() qs: string) {
        return this.usersService.findAll(+currentPage, +limit, qs);
    }

    @Get(':id')
    @ResponseMessage('Fetch user by id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch()
    @ResponseMessage('Update a user')
    update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
        return this.usersService.update(updateUserDto, user);
    }

    @Delete(':id')
    @ResponseMessage('Delete a user')
    remove(@Param('id') id: string, @User() user: IUser) {
        return this.usersService.remove(id, user);
    }
}
