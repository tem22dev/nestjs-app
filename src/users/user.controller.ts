import { Controller, Delete, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
    @Get()
    findAll(): String {
        return 'This action returns all users';
    }

    @Delete('/by-id')
    findById(): String {
        return 'This action will delete a user by id';
    }
}
