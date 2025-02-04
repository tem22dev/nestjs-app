import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
        private configService: ConfigService,
    ) {}

    async create(createRoleDto: CreateRoleDto, user: IUser) {
        const isExistName = await this.roleModel.findOne({ name: createRoleDto.name });

        if (isExistName) {
            throw new BadRequestException('name already exists');
        }

        const permission = await this.roleModel.create({
            ...createRoleDto,
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
        const { filter, sort, population, projection } = aqp(qs);

        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.roleModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.roleModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .select(projection)
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

        return (await this.roleModel.findOne({ _id: id })).populate({
            path: 'permissions',
            select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 },
        });
    }

    async update(id: string, updatePermissionDto: UpdateRoleDto, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id is not valid');
        }

        const permissionUpdate = await this.roleModel.updateOne(
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

        const foundRole = await this.roleModel.findById(id);

        if (foundRole.name === this.configService.get<string>('ROLE_ADMIN')) {
            throw new BadRequestException('Not remove role admin');
        }

        await this.roleModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return await this.roleModel.softDelete({ _id: id });
    }
}
