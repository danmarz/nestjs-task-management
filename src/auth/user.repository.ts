import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const UserRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({});
