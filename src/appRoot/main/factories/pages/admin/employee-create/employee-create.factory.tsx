import { AdminEmployeeCreateTag } from '~/appRoot/presentation/pages/admin/employee-create';
import { makeRemoteUserCreate } from '../../../usecases';

export const makeAdminEmployeeCreate = () => (
  <AdminEmployeeCreateTag remoteUserCreate={makeRemoteUserCreate()} />
);
