import {UserBasicDto} from '@core/dto/userBasicDto';
import {FileSolution} from '@core/dto/fileSolution';

export interface SolutionDto {
  solutionId: number
  taskId: number
  userBasicDto: UserBasicDto
  star: boolean
  anonymous: boolean
  fileSolutions: FileSolution[]
}


