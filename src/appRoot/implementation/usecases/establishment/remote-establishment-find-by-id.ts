import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  EstablishmentFindById,
  IEstablishmentFindById,
} from '~/appRoot/core/domain/usecases';

export class RemoteEstablishmentFindById implements IEstablishmentFindById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EstablishmentFindById.Result>,
  ) {}

  async findById(
    params: EstablishmentFindById.Params,
  ): Promise<EstablishmentFindById.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível encontrar o estabelecimento');
    }
  }
}
