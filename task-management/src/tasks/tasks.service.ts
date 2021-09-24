import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return found;
  }
  createUpdateTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    let task: Task;
    const taskIndex = this.tasks.findIndex((task) => task.title === title);
    if (taskIndex >= 0) {
      this.tasks[taskIndex].title = title;
      this.tasks[taskIndex].description = description;
      task = this.tasks[taskIndex];
    } else {
      task = {
        id: uuidv4(),
        title,
        description,
        status: TaskStatus.OPEN,
      };
      this.tasks.push(task);
    }
    return task;
  }
  deleteTask(id: string): string {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return `"task deleted successfully"`;
    } else {
      throw new NotFoundException(`Task with ${id} does not exist!`);
    }
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
