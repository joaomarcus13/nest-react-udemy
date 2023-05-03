import { ReturnCityDto } from 'src/city/dtos/ReturnCity.dto'
import { Address } from '../entities/address.entity'

export class ReturnAddressDto {

    complement: string
    numberaddress: number
    cep: string
    city?: ReturnCityDto

    constructor(
        address: Address
    ){
        this.complement = address.complement
        this.numberaddress = address.numberaddress
        this.cep = address.cep
        this.city = address.city ? new ReturnCityDto(address.city):undefined
    }
}