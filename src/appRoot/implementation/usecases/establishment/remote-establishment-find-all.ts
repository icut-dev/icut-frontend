import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  EstablishmentFindAll,
  IEstablishmentFindAll,
} from '~/appRoot/core/domain/usecases';

export class RemoteEstablishmentFindAll implements IEstablishmentFindAll {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EstablishmentFindAll.Result>,
  ) {}

  async findAll(): Promise<EstablishmentFindAll.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível encontrar o estabelecimento');
    }
  }
}
