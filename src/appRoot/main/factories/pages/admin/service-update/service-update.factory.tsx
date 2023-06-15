import { AdminServiceUpdateTag } from '~/appRoot/presentation/pages/admin/service-update';
import {
  makeRemoteServiceFindById,
  makeRemoteServiceUpdate,
} from '../../../usecases';

interface Props {
  serviceId: string;
}

export const makeAdminServiceUpdate = ({ serviceId }: Props) => (
  <AdminServiceUpdateTag
    serviceId={Number(serviceId)}
    remoteServiceUpdate={makeRemoteServiceUpdate()}
    remoteServiceFindById={makeRemoteServiceFindById()}
  />
);
