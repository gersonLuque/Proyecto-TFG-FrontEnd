import {Course} from '@core/dto/courseDto';

export interface UpdateUserDto{
  id:number,
  completeName:string,
  courseDtos:Course[]
}
