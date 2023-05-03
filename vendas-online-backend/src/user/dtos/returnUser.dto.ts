import { IsString,  } from 'class-validator';
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { User } from '../entities/user.entity';

export class ReturnUserDto {

  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[]

  constructor(userEntity: User){
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.phone = userEntity.phone
    this.cpf = userEntity.cpf
    this.addresses = userEntity.addresses ?
    userEntity.addresses.map(a=>new ReturnAddressDto(a))
    : undefined
  }
}
