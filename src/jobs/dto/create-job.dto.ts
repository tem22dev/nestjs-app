// Data transfer object

import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
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
    skills: string[];

    @IsNotEmpty({ message: 'Location không được bỏ trống' })
    location: string;

    @IsNotEmpty({ message: 'Salary không được bỏ trống' })
    salary: string;

    @IsNotEmpty({ message: 'Quantity không được bỏ trống' })
    quantity: number;

    @IsNotEmpty({ message: 'Level không được bỏ trống' })
    level: string;

    @IsNotEmpty({ message: 'StartDate không được bỏ trống' })
    startDate: Date;

    @IsNotEmpty({ message: 'EndDate không được bỏ trống' })
    endDate: Date;

    @IsNotEmpty({ message: 'IsActive không được bỏ trống' })
    isActive: Date;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}
