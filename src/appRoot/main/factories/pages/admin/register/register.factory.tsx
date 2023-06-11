import { AdminRegisterTag } from '~/appRoot/presentation/pages/admin/register';
import { makeRemoteUserCreate } from '../../../usecases';

export const makeAdminRegister = () => (
  <AdminRegisterTag remoteUserCreate={makeRemoteUserCreate()} />
);
