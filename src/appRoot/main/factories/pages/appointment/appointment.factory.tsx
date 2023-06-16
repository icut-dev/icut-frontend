import { AppointmentTag } from '~/appRoot/presentation/pages/appointment';
import {
  makeRemoteScheduleDayAvailable,
  makeRemoteEmployeeFindAllByEstablishment,
} from '../../usecases';

export const makeAppointment = () => (
  <AppointmentTag
    remoteScheduleDayAvailable={makeRemoteScheduleDayAvailable()}
    remoteEmployeeFindAllByEstablishment={makeRemoteEmployeeFindAllByEstablishment()}
  />
);
