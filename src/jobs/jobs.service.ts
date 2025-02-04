import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) {}

    async create(createJobDto: CreateJobDto, user: IUser) {
        const job = await this.jobModel.create({
            ...createJobDto,
            createdBy: {
                _id: user._id,
                name: user.name,
            },
        });

        return {
            _id: job._id,
            createdAt: job.createdAt,
        };
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population, projection } = aqp(qs);
        delete filter.page;
        delete filter.limit;

        let offset = (currentPage - 1) * limit;
        let defaultLimit = limit ? limit : 10;

        const totalItems = (await this.jobModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.jobModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .select(projection as any)
            .populate(population)
            .exec();

        return {
            result,
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
        };
    }

    async findOne(id: string) {
        const job = await this.jobModel.findOne({ _id: id });

        if (!job) {
            throw new NotFoundException('Job not found');
        }
        return job;
    }

    async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
        return await this.jobModel.updateOne(
            { _id: id },
            {
                ...updateJobDto,
                updatedBy: {
                    _id: user._id,
                    name: user.name,
                },
            },
        );
    }

    async remove(id: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id not validator');
        }

        await this.jobModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return this.jobModel.softDelete({ _id: id });
    }
}
