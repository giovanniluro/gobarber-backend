import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();

const appointmentsRepository =  new AppointmentsRepository();

appointmentRoutes.post('/', (request, response) => {
  const {provider, date} = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const foundAppointment = appointmentsRepository.findOnTheSameDate(parsedDate);

  if(foundAppointment) {
    return response.status(400).json({message: "This appointment is already booked!"});
  }

  const appointment = appointmentsRepository.create({provider, date: parsedDate});

  return response.json(appointment);
});

appointmentRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

export default appointmentRoutes;
