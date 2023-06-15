import { IScheduleCreate } from '~/appRoot/core/domain/usecases';
import { RemoteScheduleCreate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteScheduleCreate = (): IScheduleCreate =>
  new RemoteScheduleCreate(makeApiUrl('/v1/schedule'), makeAxiosHttpClient());
