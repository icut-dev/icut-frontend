import { AdminAppointmentTag } from '~/appRoot/presentation/pages/admin/appointment';
import { makeRemoteScheduleFindAll } from '../../../usecases';

export const makeAdminAppointment = () => (
  <AdminAppointmentTag remoteScheduleFindAll={makeRemoteScheduleFindAll()} />
);
