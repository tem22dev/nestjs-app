import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}

    async create(info: CreateCompanyDto, user: IUser) {
        const company = await this.companyModel.create({
            ...info,
            createdBy: {
                _id: user._id,
                email: user.email,
            },
        });

        return company;
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, projection, population } = aqp(qs);
        delete filter.page;
        delete filter.limit;

        let offset = (+currentPage - 1) * +limit;
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.companyModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.companyModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .populate(population)
            .exec();

        return {
            result,
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
        };
    }

    async findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('id not is valid');
        }

        return await this.companyModel.findOne({ _id: id });
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
        return await this.companyModel.updateOne(
            { _id: id },
            {
                ...updateCompanyDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            },
        );
    }

    async remove(id: string, User: IUser) {
        await this.companyModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: User._id,
                    email: User.email,
                },
            },
        );
        return await this.companyModel.softDelete({ _id: id });
    }
}
