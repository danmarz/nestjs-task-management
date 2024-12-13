import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

export const TaskRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Task).extend({
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      const { title, description } = createTaskDto;

      const task = this.create({
        title,
        description,
        status: TaskStatus.OPEN,
      });

      await this.save(task);
      return task;
    },
  });
