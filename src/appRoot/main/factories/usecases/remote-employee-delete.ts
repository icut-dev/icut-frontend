import { IEmployeeDelete } from '~/appRoot/core/domain/usecases';
import { RemoteEmployeeDelete } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteEmployeeDelete = (): IEmployeeDelete =>
  new RemoteEmployeeDelete(makeApiUrl('/v1/Employees'), makeAxiosHttpClient());
