import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();

appointmentRoutes.post('/', async (request, response) => {
  const createAppointment = new CreateAppointmentService();
  const { provider, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const appointment = await createAppointment.execute({provider, date: parsedDate});

    return response.json(appointment);
  }
  catch(err){
    return response.json({message: err.message});
  }
});

appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

export default appointmentRoutes;
