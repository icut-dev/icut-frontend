import { AdminEmployeeUpdateTag } from '~/appRoot/presentation/pages/admin/employee-update';
import {
  makeRemoteUserUpdate,
  makeRemoteUserFindById,
} from '../../../usecases';

interface Props {
  userId: string;
}

export const makeAdminEmployeeUpdate = ({ userId }: Props) => (
  <AdminEmployeeUpdateTag
    userId={Number(userId)}
    remoteUserUpdate={makeRemoteUserUpdate()}
    remoteUserFindById={makeRemoteUserFindById()}
  />
);
