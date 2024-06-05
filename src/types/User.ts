export interface User {
  IdUser?: number;
  FirstName: string;
  LastName: string;
  Password?: string;
  Dni: string;
  EmployeeCode?: string;
  IdArea?: string;
  Gerencia?: string;
  Shift: string;
  PhoneNumber: string;
  Mail: string;
  Rol: number;
  IndActive?: boolean;
  NameArea?: string;
  areaIdArea?: number;
  Date?: string;
}

export interface ErrorMessages {
  IdUser?: string;
  FirstName?: string;
  LastName?: string;
  Password?: string;
  Dni?: string;
  EmployeeCode?: string;
  Gerencia?: string;
  IdArea?: string;
  Shift?: string;
  PhoneNumber?: string;
  Mail?: string;
  Rol?: string;
  IndActive?: string;
  NameArea?: string;
  areaIdArea?: string;
  Date?: string;
}

export interface Login {
  UserRequest: string;
  Password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
