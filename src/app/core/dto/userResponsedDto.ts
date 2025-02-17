import { Course } from "./courseDto";

export interface UserResponsedDto{
  userId:number,
  username:string,
  completeName:string,
  rol:string,
  courses:Course[]
}
