import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsArray, IsDate, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';

class UpdatedBy {
    @IsNotEmpty()
    _id: Types.ObjectId;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

class History {
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    updatedAt: Date;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => UpdatedBy)
    updatedBy: UpdatedBy;
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => History)
    history: History[];
}
