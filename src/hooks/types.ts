export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  performance?: number;
  [key: string]: any;
}
