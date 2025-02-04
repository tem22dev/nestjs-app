import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) {}

    async create(createPermissionDto: CreatePermissionDto, user: IUser) {
        const isExistApiPath = await this.permissionModel.findOne({ apiPath: createPermissionDto.apiPath });
        const isExistMethod = await this.permissionModel.findOne({ method: createPermissionDto.method });

        if (isExistApiPath || isExistMethod) {
            throw new BadRequestException('apiPath or method already exists');
        }

        const permission = await this.permissionModel.create({
            ...createPermissionDto,
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });

        return {
            _id: permission._id,
            createdAt: permission.createdAt,
        };
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population } = aqp(qs);

        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.permissionModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.permissionModel
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
            throw new BadRequestException('id is not valid');
        }

        return await this.permissionModel.findOne({ _id: id });
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        const permissionUpdate = await this.permissionModel.updateOne(
            { _id: id },
            {
                ...updatePermissionDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return {
            result: permissionUpdate,
        };
    }

    async remove(id: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        await this.permissionModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return await this.permissionModel.softDelete({ _id: id });
    }
}
