import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name không được bỏ trống' })
    name: string;

    @IsNotEmpty({ message: 'Address không được bỏ trống' })
    address: string;

    @IsNotEmpty({ message: 'Description không được bỏ trống' })
    description: string;
}
