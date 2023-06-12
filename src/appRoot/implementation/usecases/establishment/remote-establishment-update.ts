import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  EstablishmentUpdate,
  IEstablishmentUpdate,
} from '~/appRoot/core/domain/usecases';

export class RemoteEstablishmentUpdate implements IEstablishmentUpdate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EstablishmentUpdate.Model>,
  ) {}

  async update(params: EstablishmentUpdate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'patch',
      url: `${this.url}/${params.id}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return;
      default:
        throw new Error(
          'Não foi possível atualizar o estabelecimento. Tente novamente mais tarde.',
        );
    }
  }
}
