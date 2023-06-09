import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import {Cache} from 'cache-manager'

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ){
    
      }

    async getCache<T>(key: string, fn: ()=>Promise<T>){
        const dataCache: T = await this.cacheManager.get(key)
        if(dataCache){
            return dataCache
        }

        const data: T = await fn()
        await this.cacheManager.set(key, data)
        return data
    }
}
