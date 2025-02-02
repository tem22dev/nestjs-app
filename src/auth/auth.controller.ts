import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ResponseMessage('User login')
    handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
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

    @Public()
    @Get('refresh')
    @ResponseMessage('Refresh token')
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        return this.authService.processNewToken(request, response);
    }

    @Post('logout')
    @ResponseMessage('Logout user')
    handleLogout(@Res({ passthrough: true }) response: Response, @User() user: IUser) {
        return this.authService.logout(response, user);
    }
}
