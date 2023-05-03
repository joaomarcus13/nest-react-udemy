import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto){
        const user: User | undefined = await this.userService.getUserByEmail(loginDto.email).catch(()=>undefined)
        let isMatch: boolean

        if(user)
            isMatch = await compare(loginDto.password, user.password)

        if(!user || !isMatch){
            throw new NotFoundException('Email or password invalid')
        }
        return {
            accessToken: await this.jwtService.signAsync({id: user.id, typeUser: user.typeUser}),
            user: new ReturnUserDto(user)
        }

    }
}
