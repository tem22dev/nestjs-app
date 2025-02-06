import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('subscribers')
export class SubscribersController {
    constructor(private readonly subscribersService: SubscribersService) {}

    @Post()
    @SkipCheckPermission()
    @ResponseMessage('Create a new subscriber')
    create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
        return this.subscribersService.create(createSubscriberDto, user);
    }

    @Post('skills')
    @SkipCheckPermission()
    @ResponseMessage('Get subscriber skills')
    getUserSkills(@User() user: IUser) {
        return this.subscribersService.getSkills(user);
    }

    @Get()
    // @UseGuards(TestGuard)
    @SkipCheckPermission()
    @ResponseMessage('Fetch subscriber with paginate')
    findAll(@Query('page') currentPage: string, @Query('limit') limit: string, @Query() qs: string) {
        return this.subscribersService.findAll(+currentPage, +limit, qs);
    }

    @Get(':id')
    @SkipCheckPermission()
    @ResponseMessage('Fetch subscriber by id')
    findOne(@Param('id') id: string) {
        return this.subscribersService.findOne(id);
    }

    @Patch()
    @SkipCheckPermission()
    @ResponseMessage('Update a subscriber')
    update(@Body() updateSubscriberDto: UpdateSubscriberDto, @User() user: IUser) {
        return this.subscribersService.update(updateSubscriberDto, user);
    }

    @Delete(':id')
    @SkipCheckPermission()
    @ResponseMessage('Delete a subscriber')
    remove(@Param('id') id: string, @User() user: IUser) {
        return this.subscribersService.remove(id, user);
    }
}
