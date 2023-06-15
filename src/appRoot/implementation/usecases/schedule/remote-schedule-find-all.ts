import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ScheduleFindAll,
  IScheduleFindAll,
} from '~/appRoot/core/domain/usecases';

export class RemoteScheduleFindAll implements IScheduleFindAll {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ScheduleFindAll.Result>,
  ) {}

  async findAll(): Promise<ScheduleFindAll.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível listar os agendamentos');
    }
  }
}
