import { IUserAvatar } from '~/appRoot/core/domain/usecases';
import { RemoteUserAvatar } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../http/api-url.factory';
import { makeAxiosHttpClient } from '../http/axios-http-client.factory';

export const makeRemoteUserAvatar = (): IUserAvatar =>
  new RemoteUserAvatar(makeApiUrl('/v1/users/avatar'), makeAxiosHttpClient());
