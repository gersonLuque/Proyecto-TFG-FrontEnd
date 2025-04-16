export interface UserJwtDto {
  userId: number;
  sub: string;
  rol: string;
  completeName: string;
  iat: number;
  exp: number;
}
