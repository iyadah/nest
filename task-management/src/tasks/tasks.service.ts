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
  async createUpdateTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
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
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with id ${id} not found!`);
  //   }
  //   return found;
  // }
  // createUpdateTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   let task: Task;
  //   const taskIndex = this.tasks.findIndex((task) => task.title === title);
  //   if (taskIndex >= 0) {
  //     this.tasks[taskIndex].title = title;
  //     this.tasks[taskIndex].description = description;
  //     task = this.tasks[taskIndex];
  //   } else {
  //     task = {
  //       id: uuidv4(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //   }
  //   return task;
  // }
  // deleteTask(id: string): string {
  //   const taskIndex = this.tasks.findIndex((task) => task.id === id);
  //   if (taskIndex >= 0) {
  //     this.tasks.splice(taskIndex, 1);
  //     return `"task deleted successfully"`;
  //   } else {
  //     throw new NotFoundException(`Task with ${id} does not exist!`);
  //   }
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
