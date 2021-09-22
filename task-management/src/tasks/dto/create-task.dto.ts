import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
}
