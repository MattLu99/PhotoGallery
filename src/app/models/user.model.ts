export interface User {
  id: string;
  name: string;
  lastLoginAt: Date;
  registeredAt: Date;
}

export interface UserDto {
  name: string;
  description: string;
}
