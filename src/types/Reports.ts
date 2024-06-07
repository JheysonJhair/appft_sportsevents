export interface ReportUser {
  IdUser: number;
  FirstName: string;
  LastName: string;
  Dni: string;
  PhoneNumber: string;
  Mail: string;
  Rol: number;
  Shift: string;
}

export interface ReportReservationField1 {
  IdField1Entity: number;
  StartTime: string;
  EndTime: string;
  DateDay: string;
  DateRegister: string;
  ListPlayer: string;
}

export interface ReportReservationField2 {
  IdField2Entity: number;
  StartTime: string;
  EndTime: string;
  DateDay: string;
  DateRegister: string;
  ListPlayer: string;
}

export interface ReportAdministrator {
  IdReport: number;
  Description: string;
  IndViewed: boolean;
  Date: string;
  NamePlayer: string;
}

export interface ReportAdministratorReservation {
  IdReport: number;
  StartTime: string;
  EndTime: string;
  DateDay: string;
  DateRegister: string;
  Message: string;
}
