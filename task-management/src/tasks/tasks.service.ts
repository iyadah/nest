import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
import { create } from 'domain';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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
}
