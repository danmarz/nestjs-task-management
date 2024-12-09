import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: string): string {
    value = value.toUpperCase();

    if (!(value in TaskStatus)) {
      throw new BadRequestException(
        `'${value}' is an invalid status. Valid statuses are: ${Object.values(TaskStatus).join(', ')}.`,
      );
    }

    return value;
  }
}
