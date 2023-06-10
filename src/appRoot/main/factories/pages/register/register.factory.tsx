import { RegisterTag } from '~/appRoot/presentation/pages/register';
import { makeRemoteCreateUser } from '../../usecases';

export const makeRegister = () => (
  <RegisterTag remoteCreateUser={makeRemoteCreateUser()} />
);
