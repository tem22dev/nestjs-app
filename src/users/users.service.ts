import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        return hash;
    };

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

    async findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: true, message: 'Id not valid' };
        }

        try {
            // Tìm kiếm user với id
            const user = await this.userModel.findOne({ _id: id }).exec();

            // Kiểm tra nếu không tìm thấy user
            if (!user) {
                return { error: true, message: 'User not found' };
            }

            return user; // Trả về user nếu tìm thấy
        } catch (error) {
            console.error(error); // Ghi log lỗi ra console
            return { error: true, message: error.message }; // Trả về lỗi
        }
    }

    async update(updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
