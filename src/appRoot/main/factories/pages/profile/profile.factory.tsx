import { ProfileTag } from '~/appRoot/presentation/pages/profile';
import {
  makeRemoteUserFindById,
  makeRemoteUserUpdate,
  makeRemoteUserAvatar,
} from '../../usecases';

export const makeProfile = () => (
  <ProfileTag
    remoteUserUpdate={makeRemoteUserUpdate()}
    remoteUserFindById={makeRemoteUserFindById()}
    remoteUserAvatar={makeRemoteUserAvatar()}
  />
);
