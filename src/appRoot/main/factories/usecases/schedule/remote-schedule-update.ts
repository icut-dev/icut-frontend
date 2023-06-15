import { IScheduleUpdate } from '~/appRoot/core/domain/usecases';
import { RemoteScheduleUpdate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteScheduleUpdate = (): IScheduleUpdate =>
  new RemoteScheduleUpdate(makeApiUrl('/v1/schedule'), makeAxiosHttpClient());
