'use client';

import React from 'react';
import { makeAppointment } from '~/appRoot/main/factories/pages/appointment/appointment.factory';

const Appointment: React.FC = () => {
  return makeAppointment();
};

export default Appointment;
