import { AdminCreateEmployeeTag } from '~/appRoot/presentation/pages/admin/create-employee';
import { makeRemoteUserCreate } from '../../../usecases';

export const makeAdminCreateEmployee = () => (
  <AdminCreateEmployeeTag remoteUserCreate={makeRemoteUserCreate()} />
);
