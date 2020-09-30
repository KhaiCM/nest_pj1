import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: getTasksFilterDto): Task[] {
    return this.taskService.getTasks();
  }

  @Get('/id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(CreateTaskDto);
  }

  @Post(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }

  @Patch('id/status')
  updateTaskStatus(
    @Param('id')  id: string, 
    @Body('status') status: TaskStatus
    ) {
    return this.taskService.updateTaskStatus(id, status)
  }
}
