import {Archive} from '@core/dto/archive';

export interface UpdateTaskDto{
  taskId: number
  description: string
  title: string
  startDate: string
  endDate: string
  endTime: string
  visible: boolean
  filesHasChanged:boolean
  fileTasks: Archive[]
}
