export interface UserJwtDto {
  id: number;
  username: string;
  roles: string;
  iat: number;
  exp: number;
}
