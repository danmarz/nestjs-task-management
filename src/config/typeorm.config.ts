import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('PG_HOST', 'localhost'),
  port: configService.get<number>('PG_PORT', 5432),
  username: configService.get<string>('PG_USERNAME'),
  password: configService.get<string>('PG_PASSWORD'),
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
});
