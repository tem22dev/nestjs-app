import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được bỏ trống' })
    email: string;

    @IsNotEmpty({ message: 'userId không được bỏ trống' })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'url không được bỏ trống' })
    url: string;

    @IsNotEmpty({ message: 'status không được bỏ trống' })
    status: string;

    @IsNotEmpty({ message: 'companyId không được bỏ trống' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId không được bỏ trống' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    @IsNotEmpty({ message: 'url không được bỏ trống' })
    url: string;

    @IsNotEmpty({ message: 'companyId không được bỏ trống' })
    @IsMongoId({ message: 'companyId is a mongo id' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId không được bỏ trống' })
    @IsMongoId({ message: 'jobId is a mongo id' })
    jobId: mongoose.Schema.Types.ObjectId;
}
