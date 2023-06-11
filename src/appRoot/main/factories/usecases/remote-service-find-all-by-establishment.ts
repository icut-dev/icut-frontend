import { IServiceFindAllByEstablishment } from '~/appRoot/core/domain/usecases';
import { RemoteServiceFindAllByEstablishment } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

// eslint-disable-next-line prettier/prettier
export const makeRemoteServiceFindAllByEstablishment =
  (): IServiceFindAllByEstablishment =>
    new RemoteServiceFindAllByEstablishment(
      makeApiUrl('/v1/services'),
      makeAxiosHttpClient(),
    );
