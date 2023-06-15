import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ScheduleDayAvailable,
  IScheduleDayAvailable,
} from '~/appRoot/core/domain/usecases';

export class RemoteScheduleDayAvailable implements IScheduleDayAvailable {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ScheduleDayAvailable.Result>,
  ) {}

  async dayAvailable(
    params: ScheduleDayAvailable.Params,
  ): Promise<ScheduleDayAvailable.Result> {
    const queryParams = {
      day: params.day,
      month: params.month,
      year: params.year,
    };

    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.employeeId}?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível verificar se o dia está disponível');
    }
  }
}
