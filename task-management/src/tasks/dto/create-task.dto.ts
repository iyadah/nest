import { TaskStatus } from '../task-status.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status: TaskStatus;
}
export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
}
