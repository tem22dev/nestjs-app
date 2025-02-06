import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SubscribersService {
    constructor(@InjectModel(Subscriber.name) private subscriberModel: SoftDeleteModel<SubscriberDocument>) {}

    async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
        const isExist = await this.subscriberModel.findOne({ email: createSubscriberDto.email });
        if (isExist) {
            throw new BadRequestException('Email already exists');
        }

        const subscriber = await this.subscriberModel.create({
            ...createSubscriberDto,
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });

        return {
            result: {
                _id: subscriber._id,
                createdAt: subscriber.createdAt,
            },
        };
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population } = aqp(qs);

        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.subscriberModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.subscriberModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
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
            throw new BadRequestException('id not valid');
        }

        const subscriber = await this.subscriberModel.findOne({ _id: id });
        return subscriber;
    }

    async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
        const subscriberUpdate = await this.subscriberModel.updateOne(
            { email: user.email },
            {
                ...updateSubscriberDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
            { upsert: true },
        );

        return {
            result: subscriberUpdate,
        };
    }

    async remove(id: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id not valid');
        }

        await this.subscriberModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return await this.subscriberModel.softDelete({ _id: id });
    }

    async getSkills(user: IUser) {
        const { email } = user;
        return await this.subscriberModel.findOne({ email }, { skills: 1 });
    }
}
