import {Archive} from '@core/dto/archive';

export interface TaskResponseDto {
  taskId: number
  description: string
  title: string
  startDate: string
  endDate: string
  visible: boolean
  courseName: string
  nameTeacher: string
  fileTasks: Archive[]
}


