import { AdminServiceTag } from '~/appRoot/presentation/pages/admin/service';
import { makeRemoteServiceFindAllByEstablishment } from '../../../usecases';

export const makeAdminService = () => (
  <AdminServiceTag
    remoteServiceFindAllByEstablishment={makeRemoteServiceFindAllByEstablishment()}
  />
);
