import {Course} from './courseDto';

export interface createUserDto {
  username: string
  password: string
  completeName: string
  rol: string
  courses: Course[]
}

