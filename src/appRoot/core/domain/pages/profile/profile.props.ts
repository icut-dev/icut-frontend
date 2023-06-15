import { IUserAvatar, IUserFindById, IUserUpdate } from '../../usecases';

export interface ProfileProps {
  remoteUserUpdate: IUserUpdate;
  remoteUserFindById: IUserFindById;
  remoteUserAvatar: IUserAvatar;
}
