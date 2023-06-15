import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ScheduleUpdate,
  IScheduleUpdate,
} from '~/appRoot/core/domain/usecases';

export class RemoteScheduleUpdate implements IScheduleUpdate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ScheduleUpdate.Result>,
  ) {}

  async update(params: ScheduleUpdate.Params): Promise<ScheduleUpdate.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      url: `${this.url}/${params.id}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error('Não foi possível atualizar o agendamento');
    }
  }
}
