import { IEstablishmentFindById } from '~/appRoot/core/domain/usecases';
import { RemoteEstablishmentFindById } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteEstablishmentFindById = (): IEstablishmentFindById =>
  new RemoteEstablishmentFindById(
    makeApiUrl('/v1/establishments'),
    makeAxiosHttpClient(),
  );
