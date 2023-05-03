import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Cache} from 'cache-manager'
import { City } from './entities/city.entity';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        private cacheService: CacheService
      ){
    
      }

    async getCitiesByStateId(stateId: number){

        return this.cacheService.getCache<City[]>(`state:${stateId}`, async()=> await this.cityRepository.find({where:{stateId}}))
    }

    async getById(cityId: number) {
        const city = await this.cityRepository.findOneBy({id: cityId})
        if(!city){
            throw new NotFoundException('City not found')
        }
        return city
    }

    async getAllCities(){
        return await this.cityRepository.find()
    }
}
