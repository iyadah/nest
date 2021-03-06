import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { filter } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Get('/')
  getTasks(): Promise<Task []> {
    return this.tasksService.getTasks();
  }
  // @Get('/filter')
  // getTasksFilter(@Query() filterDto: GetTaskFilterDto): Promise<string> {
  //   return 'new Task';
  //   // if (Object.keys(filterDto).length) {
  //   //  // return this.tasksService.getTasksWithFilter(filterDto);
  //   // } else {
  //   // //  return this.tasksService.getTasks();
  //   // }
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createUpdateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createUpdateTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<string> {
    return this.tasksService.deleteTask(id);
  }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
