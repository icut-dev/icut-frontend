import { IScheduleFindAll } from '~/appRoot/core/domain/usecases';
import { RemoteScheduleFindAll } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteScheduleFindAll = (): IScheduleFindAll =>
  new RemoteScheduleFindAll(makeApiUrl('/v1/schedule'), makeAxiosHttpClient());
