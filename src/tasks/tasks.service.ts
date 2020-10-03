// import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  // getTasks(@Query() filerDto: getTasksFilterDto): Task[] {
  //   if (Object.keys(filerDto).length) return this.tasks;
  // }
  
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Task With ID "${id}" not found`);
    }
    
    return found;
  }

  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN
    task.save();

    return task;
  }

  // createTask(CreateTaskDto: CreateTaskDto): Task {
  //   const { title, description } = CreateTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);

  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const taskById = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== taskById.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;

  //   return task;
  // }
}
