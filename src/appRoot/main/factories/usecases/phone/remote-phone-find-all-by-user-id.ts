import { IPhoneFindAllByUserId } from '~/appRoot/core/domain/usecases';
import { RemotePhoneFindAllByUserId } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemotePhoneFindAllByUserId = (): IPhoneFindAllByUserId =>
  new RemotePhoneFindAllByUserId(
    makeApiUrl('/v1/telephones'),
    makeAxiosHttpClient(),
  );
