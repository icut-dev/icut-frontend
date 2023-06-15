import { IEstablishmentUploadLogo } from '~/appRoot/core/domain/usecases';
import { RemoteEstablishmentUploadLogo } from '~/appRoot/implementation/usecases';
import { makeApiUrl } from '../../http/api-url.factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client.factory';

export const makeRemoteEstablishmentUploadLogo = (): IEstablishmentUploadLogo =>
  new RemoteEstablishmentUploadLogo(
    makeApiUrl('/v1/establishments/logo'),
    makeAxiosHttpClient(),
  );
