import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private configService: ConfigService,
        private authService: AuthService,
    ) {}

    @Get()
    @Render('home')
    getHello() {
        // return this.appService.getHello();
        console.log(this.configService.get<string>('PORT'));

        const messageText = this.appService.getHello();
        return {
            message: messageText,
        };
    }

    @Post('login')
    // @UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    handleLogin(@Request() req) {
        // return req.user;
        return this.authService.login(req.user);
    }
}
