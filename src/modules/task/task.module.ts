import { Module } from '@nestjs/common';
import { TaskSchedule } from './task.schedule';

@Module({
  providers: [TaskSchedule]
})
export class TaskModule {}