export interface UserEntity extends Record<string, any> {
  key?: string;
  id?: string;
  userName: string;
  userEmail: string;
}
