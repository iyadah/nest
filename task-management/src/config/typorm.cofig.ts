import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mydb.chd28lu80wma.ca-central-1.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'admin12345',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
