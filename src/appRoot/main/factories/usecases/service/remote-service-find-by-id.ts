import { IServiceFindById } from '~/appRoot/core/domain/usecases';
import { RemoteServiceFindById } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

// eslint-disable-next-line prettier/prettier
export const makeRemoteServiceFindById = (): IServiceFindById =>
  new RemoteServiceFindById(makeApiUrl('/v1/services'), makeAxiosHttpClient());
