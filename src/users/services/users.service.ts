import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Customer } from './../entities/customer.entity';
import { Order } from './../entities/order.entity';
import { ProductsService } from './../../products/services/products.service';

import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      username: 'Product 1',
      description: 'bla bla',
      email: 'correo@gmail.com',
      password: 'sdf',
      image: '',
      role: 'admin',
    },
  ];
  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const product = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...product,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`user #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
  getOrderByUser(id: number) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      prducts: this.productsService.findAll(),
    };
  }
}
