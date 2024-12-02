import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        return hash;
    };

    // create(createUserDto: CreateUserDto);
    async create(info: CreateUserDto) {
        const hashPass = this.getHashPassword(info.password);

        const user = await this.userModel.create({
            email: info.email,
            password: hashPass,
            name: info.name,
        });
        console.log(user);

        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
