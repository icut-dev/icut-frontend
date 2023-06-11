import { AdminProfileTag } from '~/appRoot/presentation/pages/admin/profile';
import {
  makeRemotePhoneFindAllByUserId,
  makeRemoteUserFindById,
  makeRemoteUserUpdate,
} from '../../../usecases';

export const makeAdminProfile = () => (
  <AdminProfileTag
    remoteUserUpdate={makeRemoteUserUpdate()}
    remoteUserFindById={makeRemoteUserFindById()}
    remotePhoneFindAllByUserId={makeRemotePhoneFindAllByUserId()}
  />
);
