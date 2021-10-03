import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typorm.cofig';
import { TasksModule } from './tasks/tasks.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig), ProfilesModule],
})
export class AppModule {}
