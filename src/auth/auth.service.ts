import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import ms from 'ms';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneUsername(username);
        if (user) {
            const isValid = this.userService.isValidPassword(pass, user.password);
            if (isValid === true) {
                return user;
            }
        }

        return null;
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: 'token login',
            iss: 'from server',
            _id,
            name,
            email,
            role,
        };

        // Set refresh token for cookie client
        const refreshToken = this.createRefreshToken(payload);
        await this.userService.updateRefreshToken(_id, refreshToken);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRATION')),
        });

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                _id,
                name,
                email,
                role,
            },
        };
    }

    async register(user: RegisterUserDto) {
        const newUser = await this.userService.register(user);

        return {
            _id: newUser?._id,
            createdAt: newUser?.createdAt,
        };
    }

    createRefreshToken = (payload: any) => {
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRATION')) / 1000,
        });

        return refreshToken;
    };

    processNewToken = async (request: Request, response: Response) => {
        try {
            const refreshToken = request.cookies['refreshToken'];
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            });

            let user = await this.userService.findUserByToken(refreshToken);
            if (!user) {
                throw new BadRequestException('Refresh token is invalid');
            }

            const { _id, name, email, role } = user;
            const payload = {
                sub: 'refresh token login',
                iss: 'from server',
                _id,
                name,
                email,
                role,
            };

            // Set refresh token for cookie client
            const newRefreshToken = this.createRefreshToken(payload);
            await this.userService.updateRefreshToken(_id.toString(), newRefreshToken);
            response.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRATION')),
            });

            return {
                accessToken: this.jwtService.sign(payload),
                user: {
                    _id,
                    name,
                    email,
                    role,
                },
            };
        } catch (error) {
            throw new BadRequestException('Refresh token is invalid');
        }
    };
}
