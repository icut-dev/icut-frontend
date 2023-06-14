import { IServiceCreate } from '~/appRoot/core/domain/usecases';
import { RemoteServiceCreate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteServiceCreate = (): IServiceCreate =>
  new RemoteServiceCreate(makeApiUrl('/v1/services'), makeAxiosHttpClient());
