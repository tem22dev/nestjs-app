import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('register')
    @ResponseMessage('Register a new user')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
