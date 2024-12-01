import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private configService: ConfigService,
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
}
