import { AdminProfileTag } from '~/appRoot/presentation/pages/admin/profile';
import {
  makeRemotePhoneFindAllByUserId,
  makeRemoteUserFindById,
  makeRemoteUserUpdate,
  makeRemoteUserAvatar,
} from '../../../usecases';

export const makeAdminProfile = () => (
  <AdminProfileTag
    remoteUserUpdate={makeRemoteUserUpdate()}
    remoteUserFindById={makeRemoteUserFindById()}
    remotePhoneFindAllByUserId={makeRemotePhoneFindAllByUserId()}
    remoteUserAvatar={makeRemoteUserAvatar()}
  />
);
