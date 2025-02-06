import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import aqp from 'api-query-params';
import { ConfigService } from '@nestjs/config';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
    ) {}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    };

    isValidPassword = (password: string, hash: string) => {
        return compareSync(password, hash);
    };

    async create(info: CreateUserDto, user: IUser) {
        const isExist = await this.userModel.findOne({ email: info.email });
        if (isExist) {
            throw new BadRequestException('Email already exists');
        }

        const hashPass = this.getHashPassword(info.password);
        const newUser = await this.userModel.create({
            ...info,
            password: hashPass,
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });

        return {
            result: {
                _id: newUser._id,
                createdAt: newUser.createdAt,
            },
        };
    }

    async register(info: RegisterUserDto) {
        const isExist = await this.userModel.findOne({ email: info.email });
        if (isExist) {
            throw new BadRequestException('Email already exists');
        }

        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        const hashPass = this.getHashPassword(info.password);

        const user = await this.userModel.create({
            ...info,
            role: userRole,
            password: hashPass,
        });

        return user;
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population, projection } = aqp(qs);

        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.userModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .select({ ...projection, password: 0 })
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
        // Cách 1
        // const user = await this.userModel.findOne({ _id: id }).exec();
        // const { password, ...result } = user.toObject();
        // return result;

        // Cách 2
        const user = await this.userModel
            .findOne({ _id: id })
            .select('-password')
            .populate({ path: 'role', select: { name: 1 } });
        return user;
    }

    async findOneUsername(username: string) {
        return this.userModel
            .findOne({
                email: username,
            })
            .populate({ path: 'role', select: { name: 1 } });
    }

    async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id not valid');
        }

        const userUpdate = await this.userModel.updateOne(
            { _id: id },
            {
                ...updateUserDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return {
            result: userUpdate,
        };
    }

    async remove(id: string, user: IUser) {
        const foundUser: IUser = await this.userModel.findById(id);

        if (foundUser && foundUser.email === this.configService.get<string>('EMAIL_ADMIN')) {
            throw new BadRequestException('Not remove account admin');
        }

        await this.userModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );

        return await this.userModel.softDelete({ _id: id });
    }

    updateRefreshToken = async (_id: string, refreshToken: string) => {
        return await this.userModel.updateOne({ _id }, { refreshToken });
    };

    findUserByToken = async (refreshToken: string) => {
        return await this.userModel.findOne({ refreshToken }).populate({ path: 'role', select: { name: 1 } });
    };
}
