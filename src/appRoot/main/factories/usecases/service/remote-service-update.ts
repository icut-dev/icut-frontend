import { IServiceUpdate } from '~/appRoot/core/domain/usecases';
import { RemoteServiceUpdate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteServiceUpdate = (): IServiceUpdate =>
  new RemoteServiceUpdate(makeApiUrl('/v1/services'), makeAxiosHttpClient());
