import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly dataSource: DataSource) {}

  private userRepository = UserRepository(this.dataSource);
}
