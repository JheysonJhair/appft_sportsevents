export interface User {
  IdUser?: string;
  Code: string;
  Username: string;
  Password: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Dni: string;
  Access: boolean;
  RoleId: number;
  Email: string;
  Birdhate: string;
  Note: string;
  Image: string;
}
export interface Login {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}