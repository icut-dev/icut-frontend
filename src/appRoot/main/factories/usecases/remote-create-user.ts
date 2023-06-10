import { ICreateUser } from '~/appRoot/core/domain/usecases/create-user';
import { RemoteCreateUser } from '~/appRoot/implementation/usecases/remote-create-user';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteCreateUser = (): ICreateUser =>
  new RemoteCreateUser(makeApiUrl('/v1/users'), makeAxiosHttpClient());
