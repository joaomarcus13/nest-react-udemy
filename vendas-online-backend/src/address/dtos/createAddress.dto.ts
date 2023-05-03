import {IsInt, IsOptional, IsString} from 'class-validator'

export class CreateAddressDto {
    @IsString()
    @IsOptional()
    complement: string
    
    @IsInt()
    numberaddress: number
    
    @IsString()
    cep: string
    
    @IsInt()
    cityId: number
}