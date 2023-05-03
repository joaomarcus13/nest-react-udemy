import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHash,
    })
  }

  async getUserByIdUsingReferences(userId: number){
    return await this.userRepository.findOne({where: {id: userId}, relations: {addresses: {
      city: {
        state: true
      } 
    }}})
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(userId: number){
    const user = await this.userRepository.findOneBy({id: userId})
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

  async getUserByEmail(email: string){
    const user = await this.userRepository.findOneBy({email})
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

}
