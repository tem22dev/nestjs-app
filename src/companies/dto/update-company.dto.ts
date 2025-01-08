import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
    @IsNotEmpty({ message: 'Name không được bỏ trống' })
    name: string;

    @IsNotEmpty({ message: 'Address không được bỏ trống' })
    address: string;

    @IsNotEmpty({ message: 'Description không được bỏ trống' })
    description: string;
}
