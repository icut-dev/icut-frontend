import { IEstablishmentFindAll } from '~/appRoot/core/domain/usecases';
import { RemoteEstablishmentFindAll } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteEstablishmentFindAll = (): IEstablishmentFindAll =>
  new RemoteEstablishmentFindAll(
    makeApiUrl('/v1/establishments'),
    makeAxiosHttpClient(),
  );
