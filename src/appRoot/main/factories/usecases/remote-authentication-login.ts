import { IAuthentication } from '~/appRoot/core/domain/usecases';
import { RemoteAuthenticationLogin } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteAuthenticationLogin = (): IAuthentication =>
  new RemoteAuthenticationLogin(
    makeApiUrl('/v1/auth/login'),
    makeAxiosHttpClient(),
  );
