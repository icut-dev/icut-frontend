import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  IServiceFindAllByEstablishment,
  ServiceFindAllByEstablishment,
} from '~/appRoot/core/domain/usecases';

export class RemoteServiceFindAllByEstablishment
  // eslint-disable-next-line prettier/prettier
  implements IServiceFindAllByEstablishment
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ServiceFindAllByEstablishment.Result>,
  ) {}

  async findAllByEstablishment(
    params: ServiceFindAllByEstablishment.Params,
  ): Promise<ServiceFindAllByEstablishment.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.establishmentId}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        return [];
    }
  }
}
