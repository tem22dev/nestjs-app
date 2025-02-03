// Data transfer object

import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsString,
    ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateJobDto {
    @IsNotEmpty({ message: 'Name không được bỏ trống' })
    name: string;

    @IsNotEmpty({ message: 'Skills không được bỏ trống' })
    @IsArray({ message: 'Skills có định dạng là array' })
    @IsString({ each: true, message: 'Skills có định dạng là string' })
    skills: string[];

    @IsNotEmpty({ message: 'Salary không được bỏ trống' })
    salary: string;

    @IsNotEmpty({ message: 'Quantity không được bỏ trống' })
    quantity: number;

    @IsNotEmpty({ message: 'Level không được bỏ trống' })
    level: string;

    @IsNotEmpty({ message: 'StartDate không được bỏ trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'StartDate có định dạng là Date' })
    startDate: Date;

    @IsNotEmpty({ message: 'EndDate không được bỏ trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'EndDate có định dạng là Date' })
    endDate: Date;

    @IsNotEmpty({ message: 'IsActive không được bỏ trống' })
    @IsBoolean({ message: 'IsActive có định dạng là Boolean' })
    isActive: boolean;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}
