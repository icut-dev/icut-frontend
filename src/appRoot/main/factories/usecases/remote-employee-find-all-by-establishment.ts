import { IEmployeeFindAllByEstablishment } from '~/appRoot/core/domain/usecases';
import { RemoteEmployeeFindAllByEstablishment } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

// eslint-disable-next-line prettier/prettier
export const makeRemoteEmployeeFindAllByEstablishment =
  (): IEmployeeFindAllByEstablishment =>
    new RemoteEmployeeFindAllByEstablishment(
      makeApiUrl('/v1/employees'),
      makeAxiosHttpClient(),
    );
