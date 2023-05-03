import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>
      ){
    
      }

    async getAllStates(){
        return await this.stateRepository.find()
    }
}
