import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ScheduleDelete,
  IScheduleDelete,
} from '~/appRoot/core/domain/usecases';

export class RemoteScheduleDelete implements IScheduleDelete {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ScheduleDelete.Result>,
  ) {}

  async delete(params: ScheduleDelete.Params): Promise<ScheduleDelete.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'delete',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error('Não foi possível cancelar o agendamento');
    }
  }
}
