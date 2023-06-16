import { IScheduleDayAvailable } from '~/appRoot/core/domain/usecases';
import { RemoteScheduleDayAvailable } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteScheduleDayAvailable = (): IScheduleDayAvailable =>
  new RemoteScheduleDayAvailable(
    makeApiUrl('/v1/schedule/day-available'),
    makeAxiosHttpClient(),
  );
