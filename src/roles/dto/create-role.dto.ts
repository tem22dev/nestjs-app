import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Name không được bỏ trống' })
    name: string;

    @IsNotEmpty({ message: 'description không được bỏ trống' })
    description: string;

    @IsNotEmpty({ message: 'isActive không được bỏ trống' })
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty({ message: 'permissions không được bỏ trống' })
    @IsMongoId({ each: true })
    @IsArray()
    permissions: mongoose.Schema.Types.ObjectId[];
}
