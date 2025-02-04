import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
    constructor(@InjectModel(Resume.name) private resumeModel: SoftDeleteModel<ResumeDocument>) {}

    async create(CreateUserCvDto: CreateUserCvDto, user: IUser) {
        const resume = await this.resumeModel.create({
            ...CreateUserCvDto,
            email: user.email,
            userId: user._id,
            status: 'PENDING',
            history: [
                {
                    status: 'PENDING',
                    updatedAt: new Date(),
                    updatedBy: {
                        _id: user._id,
                        email: user.email,
                    },
                },
            ],
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });

        return {
            _id: resume?.id,
            createdAt: resume?.createdAt,
        };
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population, projection } = aqp(qs);

        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.resumeModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.resumeModel
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        return await this.resumeModel.findOne({ _id: id });
    }

    async findCvByUser(user: IUser) {
        return await this.resumeModel.findOne({ userId: user._id });
    }

    async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        const resumeUpdate = await this.resumeModel.updateOne(
            { _id: id },
            {
                ...updateResumeDto,
                email: user.email,
                userId: user._id,
                status: 'PENDING',
                history: [
                    {
                        status: 'PENDING',
                        updatedAt: new Date(),
                        updatedBy: {
                            _id: user._id,
                            email: user.email,
                        },
                    },
                ],
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return resumeUpdate;
    }

    async updateStatus(id: string, status: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        const resumeUpdateStatus = await this.resumeModel.updateOne(
            { _id: id },
            {
                status,
                $push: {
                    history: {
                        status,
                        updatedAt: new Date(),
                        updatedBy: {
                            _id: user._id,
                            email: user.email,
                        },
                    },
                },
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return resumeUpdateStatus;
    }

    async remove(id: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        await this.resumeModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return await this.resumeModel.softDelete({ _id: id });
    }
}
