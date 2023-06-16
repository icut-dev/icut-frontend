import { AdminServiceTag } from '~/appRoot/presentation/pages/admin/service';
import {
  makeRemoteServiceDelete,
  makeRemoteServiceFindAllByEstablishment,
} from '../../../usecases';

export const makeAdminService = () => (
  <AdminServiceTag
    remoteServiceDelete={makeRemoteServiceDelete()}
    remoteServiceFindAllByEstablishment={makeRemoteServiceFindAllByEstablishment()}
  />
);
