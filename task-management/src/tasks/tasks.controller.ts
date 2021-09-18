import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() body): Task {
    return this.tasksService.createTask(body.title, body.description);
  }
}
