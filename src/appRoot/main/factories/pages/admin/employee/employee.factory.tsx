import { AdminEmployeeTag } from '~/appRoot/presentation/pages/admin/employee';
import { makeRemoteEmployeeFindAllByEstablishment } from '../../../usecases';

export const makeAdminEmployee = () => (
  <AdminEmployeeTag
    remoteEmployeeFindAllByEstablishment={makeRemoteEmployeeFindAllByEstablishment()}
  />
);
