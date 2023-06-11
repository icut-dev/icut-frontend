import { IUserCreate } from '~/appRoot/core/domain/usecases';
import { RemoteUserFindById } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteUserFindById = (): IUserCreate =>
  new RemoteUserFindById(makeApiUrl('/v1/users'), makeAxiosHttpClient());
