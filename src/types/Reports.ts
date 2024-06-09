export interface ReportUser {
  IdUser: number;
  FirstName: string;
  LastName: string;
  Dni: string;
  PhoneNumber: string;
  Mail: string;
  Rol: number;
  Shift: string;
  NameArea: string;
  NameManagement: string;
}

export interface ReportReservationField1 {
  IdField1Entity: number;
  StartTime: string;
  EndTime: string;
  DateDay: string;
  DateRegister: string;
  ListPlayer: string;
}

export interface User {
  IdUser: number;
  FirstName: string;
  LastName: string;
  Password: string;
  Dni: string;
  EmployeeCode: string;
  Shift: string;
  PhoneNumber: string;
  Mail: string;
  Rol: number;
  Date: string;
  IndActive: boolean;
  NameArea: string;
}

export interface ReportReservationField2 {
  IdField2Entity: number;
  StartTime: string;
  EndTime: string;
  DateDay: string;
  DateRegister: string;
  ListPlayer: string;
  User: User;
}

export interface ReportAdministrator {
  IdReport: number;
  Description: string;
  IndViewed: boolean;
  Date: string;
  NamePlayer: string;
}

export interface ReportAdministratorReservation {
  IdNotificationAll: number;
  DateRegister: string;
  DateDay: string;
  Time: string;
  Message: string;
}
