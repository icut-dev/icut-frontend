import { AdminAppointmentTag } from '~/appRoot/presentation/pages/admin/appointment';
import {
  makeRemoteScheduleDayAvailable,
  makeRemoteScheduleDelete,
  makeRemoteScheduleFindAll,
  makeRemoteScheduleUpdate,
} from '../../../usecases';

export const makeAdminAppointment = () => (
  <AdminAppointmentTag
    remoteScheduleUpdate={makeRemoteScheduleUpdate()}
    remoteScheduleDelete={makeRemoteScheduleDelete()}
    remoteScheduleFindAll={makeRemoteScheduleFindAll()}
    remoteScheduleDayAvailable={makeRemoteScheduleDayAvailable()}
  />
);
