import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);

    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private userService: UsersService,
    ) {}

    async onModuleInit() {
        const isInit = this.configService.get<string>('SHOULD_INIT');
        if (Boolean(isInit)) {
            await this.initializeData();
        }
    }

    private async initializeData() {
        // Initialize permissions
        const permissionCount = await this.permissionModel.countDocuments({});
        if (permissionCount === 0) {
            await this.permissionModel.insertMany(INIT_PERMISSIONS);
        }

        // Initialize roles
        const roleCount = await this.roleModel.countDocuments({});
        if (roleCount === 0) {
            const permissions = await this.permissionModel.find({}).select('_id');
            await this.roleModel.insertMany([
                { name: ADMIN_ROLE, description: 'Admin thì full quyền :))', isActive: true, permissions: permissions },
                {
                    name: USER_ROLE,
                    description: 'Người dùng / ứng viên sử dụng hệ thống',
                    isActive: true,
                    permissions: [],
                },
            ]);
        }

        // Initialize users
        const userCount = await this.userModel.countDocuments({});
        if (userCount === 0) {
            const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
            const userRole = await this.roleModel.findOne({ name: USER_ROLE });

            await this.userModel.insertMany([
                {
                    name: 'Admin',
                    email: this.configService.get<string>('EMAIL_ADMIN'),
                    password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                    age: 30,
                    gender: 'MALE',
                    address: 'vietnam',
                    role: adminRole?._id,
                },
                {
                    name: 'trungem',
                    email: 'trungem@gmail.com',
                    password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                    age: 30,
                    gender: 'MALE',
                    address: 'vietnam',
                    role: adminRole?._id,
                },
                {
                    name: 'user 1',
                    email: 'user1@gmail.com',
                    password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                    age: 30,
                    gender: 'MALE',
                    address: 'vietnam',
                    role: userRole?._id,
                },
                {
                    name: 'user 2',
                    email: 'user2@gmail.com',
                    password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                    age: 30,
                    gender: 'MALE',
                    address: 'vietnam',
                    role: userRole?._id,
                },
            ]);
        }

        if (userCount > 0 && roleCount > 0 && permissionCount > 0) {
            this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
        }
    }
}
