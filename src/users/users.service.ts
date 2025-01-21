import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) {}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    };

    isValidPassword = (password: string, hash: string) => {
        return compareSync(password, hash);
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

    async findAll() {
        // return await this.userModel.find({});
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

    async findOneUsername(username: string) {
        return this.userModel.findOne({
            email: username,
        });
    }

    async update(updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
    }

    async remove(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { error: true, message: 'Id not valid' };
        }

        try {
            return await this.userModel.softDelete({ _id: id });
        } catch (error) {
            console.error(error); // Ghi log lỗi ra console
            return { error: true, message: error.message }; // Trả về lỗi
        }
    }
}
