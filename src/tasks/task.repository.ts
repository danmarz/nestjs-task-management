import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

export const TaskRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Task).extend({
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      const { status, search } = filterDto;
      const query = this.createQueryBuilder('task');

      // Apply status filter if provided
      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      // Apply search filter if provided
      if (search) {
        query.andWhere(
          '(task.title LIKE :search OR task.description LIKE :search)',
          { search: `%${search}%` },
        );
      }

      const tasks = await query.getMany();
      return tasks;
    },

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
