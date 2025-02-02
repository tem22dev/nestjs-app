import { Body, Controller, Get, Post, Render, Request, Res, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { IUser } from 'src/users/users.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ResponseMessage('User login')
    handleLogin(@Request() req, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    @Public()
    @Post('register')
    @ResponseMessage('Register a new user')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Get('account')
    @ResponseMessage('Get current user')
    getProfile(@User() user: IUser) {
        return { user };
    }
}
