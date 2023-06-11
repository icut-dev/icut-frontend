import { IUserUpdate } from '~/appRoot/core/domain/usecases';
import { RemoteUserUpdate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteUserUpdate = (): IUserUpdate =>
  new RemoteUserUpdate(makeApiUrl('/v1/users'), makeAxiosHttpClient());
