import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
    constructor(private readonly resumesService: ResumesService) {}

    @Post()
    @ResponseMessage('Create new a resume')
    create(@Body() createResumeDto: CreateUserCvDto, @User() user: IUser) {
        return this.resumesService.create(createResumeDto, user);
    }

    @Get()
    @ResponseMessage('fetch list resume')
    findAll(@Query('page') currentPage: string, @Query('limit') limit: string, @Query() qs: string) {
        return this.resumesService.findAll(+currentPage, +limit, qs);
    }

    @Get('by-user')
    @ResponseMessage('fetch a resume by user')
    findCvByUser(@User() user: IUser) {
        return this.resumesService.findCvByUser(user);
    }

    @Get(':id')
    @ResponseMessage('fetch a resume by id')
    findOne(@Param('id') id: string) {
        return this.resumesService.findOne(id);
    }

    // @Patch(':id')
    // @ResponseMessage('Update a resume')
    // update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto, @User() user: IUser) {
    //     return this.resumesService.update(id, updateResumeDto, user);
    // }

    @Patch('status/:id')
    @ResponseMessage('Update status a resume')
    updateStatus(@Param('id') id: string, @Body('status') status: string, @User() user: IUser) {
        return this.resumesService.updateStatus(id, status, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @User() user: IUser) {
        return this.resumesService.remove(id, user);
    }
}
