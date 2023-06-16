import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  IServiceFindById,
  ServiceFindById,
} from '~/appRoot/core/domain/usecases';

export class RemoteServiceFindById implements IServiceFindById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ServiceFindById.Result>,
  ) {}

  async findById(
    params: ServiceFindById.Params,
  ): Promise<ServiceFindById.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível encontrar o serviço');
    }
  }
}
