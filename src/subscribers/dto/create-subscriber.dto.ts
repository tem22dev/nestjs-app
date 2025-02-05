import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Name không được bỏ trống' })
    name: string;

    @IsNotEmpty({ message: 'Skills không được bỏ trống' })
    @IsArray({ message: 'Skills có định dạng là array' })
    @IsString({ each: true, message: 'Skills có định dạng là string' })
    skills: string[];

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
