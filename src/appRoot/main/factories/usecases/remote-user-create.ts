import { IUserCreate } from '~/appRoot/core/domain/usecases';
import { RemoteUserCreate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteUserCreate = (): IUserCreate =>
  new RemoteUserCreate(makeApiUrl('/v1/users'), makeAxiosHttpClient());
