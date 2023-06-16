import { AdminServiceCreateTag } from '~/appRoot/presentation/pages/admin/service-create';
import { makeRemoteServiceCreate } from '../../../usecases';

export const makeAdminServiceCreate = () => (
  <AdminServiceCreateTag remoteServiceCreate={makeRemoteServiceCreate()} />
);
