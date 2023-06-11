import { PreconditionFailedError } from '~/appRoot/core/domain/errors/precondition-failed';
import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  EstablishmentUpdate,
  IEstablishmentUpdate,
} from '~/appRoot/core/domain/usecases';

export namespace RemoteEstablishmentUpdateNamespace {
  export type Model = EstablishmentUpdate.Model;
}

export class RemoteEstablishmentUpdate implements IEstablishmentUpdate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEstablishmentUpdateNamespace.Model>,
  ) {}

  async update(params: EstablishmentUpdate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'patch',
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.preconditionFailed:
        throw new PreconditionFailedError(
          'As informações de login já estão sendo utilizadas',
        );
      default:
        break;
    }
  }
}
