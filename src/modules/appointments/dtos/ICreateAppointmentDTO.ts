export interface ICreateAppointmentDTO {
  provider_id: string;
  date: Date;
}

export interface IFindAllInMonthDTO {
  user_id: string;
  month: number;
  year: number;
}
