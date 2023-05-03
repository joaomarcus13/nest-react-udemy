import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './entities/city.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([City]),
    CacheModule
  ],
  controllers: [CityController],
  providers: [CityService],
  exports:[CityService]
})
export class CityModule {}
