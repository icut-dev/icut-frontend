import { IEstablishmentUpdate } from '~/appRoot/core/domain/usecases';
import { RemoteEstablishmentUpdate } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteEstablishmentUpdate = (): IEstablishmentUpdate =>
  new RemoteEstablishmentUpdate(
    makeApiUrl('/v1/establishments'),
    makeAxiosHttpClient(),
  );
