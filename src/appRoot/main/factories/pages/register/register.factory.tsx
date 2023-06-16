import { RegisterTag } from '~/appRoot/presentation/pages/register';
import { makeRemoteUserCreate } from '../../usecases';

export const makeRegister = () => (
  <RegisterTag remoteCreateUser={makeRemoteUserCreate()} />
);
