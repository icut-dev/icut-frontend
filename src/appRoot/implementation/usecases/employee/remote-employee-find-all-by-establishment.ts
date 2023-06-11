import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  IEmployeeFindAllByEstablishment,
  EmployeeFindAllByEstablishment,
} from '~/appRoot/core/domain/usecases';

export class RemoteEmployeeFindAllByEstablishment
  // eslint-disable-next-line prettier/prettier
  implements IEmployeeFindAllByEstablishment
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeFindAllByEstablishment.Result>,
  ) {}

  async findAllByEstablishment(
    params: EmployeeFindAllByEstablishment.Params,
  ): Promise<EmployeeFindAllByEstablishment.Result> {
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
