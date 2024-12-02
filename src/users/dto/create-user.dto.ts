// Data transfer object

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được bỏ trống' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
    password: string;

    address: string;
    name: string;
}
