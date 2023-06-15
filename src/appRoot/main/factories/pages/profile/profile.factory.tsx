import { ProfileTag } from '~/appRoot/presentation/pages/profile';
import { makeRemoteUserFindById, makeRemoteUserUpdate } from '../../usecases';
import { makeRemoteUserAvatar } from '../../usecases/remote-user-avatar';

export const makeProfile = () => (
  <ProfileTag
    remoteUserUpdate={makeRemoteUserUpdate()}
    remoteUserFindById={makeRemoteUserFindById()}
    remoteUserAvatar={makeRemoteUserAvatar()}
  />
);
