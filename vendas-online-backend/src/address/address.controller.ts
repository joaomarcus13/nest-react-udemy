import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UserId } from 'src/user/decorators/userId.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Roles(UserType.User)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto, 
        @UserId() userId: number
    ){
        return this.addressService.createAddress(createAddressDto, userId)
    }

}
