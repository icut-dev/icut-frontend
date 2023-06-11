import { IServiceDelete } from '~/appRoot/core/domain/usecases';
import { RemoteServiceDelete } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteServiceDelete = (): IServiceDelete =>
  new RemoteServiceDelete(makeApiUrl('/v1/services'), makeAxiosHttpClient());
