import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return found;
  }

  async getTasks(): Promise<Task []> {
    const found = await this.taskRepository.find();
    if (!found) {
      throw new NotFoundException('No tasks');
    }
    return found;
  }
  async getTasksWithFilter(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    if (status) {
      return await this.taskRepository.find({status:status});
    }
    if (search) {
      return await this.taskRepository.find({title:`%${search}%`})
    }
    return [];
  }
  async createUpdateTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
    console.log(createTaskDto);
    let task= new Task();
    const taskExists = await this.taskRepository.findOne({title: title})
    if (taskExists) {
      task.description = description;
      task.status = status;
      await this.taskRepository.save({
        id: taskExists.id,
        description: description,
        status: status
      });
      return task;
    } 
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
  async deleteTask(id: number): Promise<string> {
    const taskExists = await this.taskRepository.findOne(id);
    if (taskExists) {
      this.taskRepository.delete(id);
      return `"task deleted successfully"`;
    } else {
      throw new NotFoundException(`Task with ${id} does not exist!`);
    }
  }
}
