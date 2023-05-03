import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        private readonly userService: UserService ,
        private readonly cityService: CityService 
      ){}


      async createAddress(createAddressDto: CreateAddressDto, userId: number){
       await this.userService.getUserById(userId)
       await this.cityService.getById(createAddressDto.cityId)
       return this.addressRepository.save({
            ...createAddressDto,
            userId
        })
      }
}
