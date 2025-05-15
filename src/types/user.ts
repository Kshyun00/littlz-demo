export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
} 