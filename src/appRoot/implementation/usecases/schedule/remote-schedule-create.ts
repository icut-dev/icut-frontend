import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ScheduleCreate,
  IScheduleCreate,
} from '~/appRoot/core/domain/usecases';

export class RemoteScheduleCreate implements IScheduleCreate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ScheduleCreate.Result>,
  ) {}

  async create(params: ScheduleCreate.Params): Promise<ScheduleCreate.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: `${this.url}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error('Não foi possível realizar o agendamento');
    }
  }
}
