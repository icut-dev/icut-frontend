import { IScheduleDelete } from '~/appRoot/core/domain/usecases';
import { RemoteScheduleDelete } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteScheduleDelete = (): IScheduleDelete =>
  new RemoteScheduleDelete(makeApiUrl('/v1/schedule'), makeAxiosHttpClient());
