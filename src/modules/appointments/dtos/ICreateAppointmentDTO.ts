export interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

export interface IFindAllInMonthDTO {
  user_id: string;
  month: number;
  year: number;
}

export interface IFindAllInDay {
  user_id: string;
  month: number;
  year: number;
  day: number;
}
