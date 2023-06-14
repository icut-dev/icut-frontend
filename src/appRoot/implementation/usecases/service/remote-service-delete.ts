import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IServiceDelete, ServiceDelete } from '~/appRoot/core/domain/usecases';

export class RemoteServiceDelete implements IServiceDelete {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ServiceDelete.Result>,
  ) {}

  async delete(params: ServiceDelete.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'delete',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return;
      default:
        throw new Error('Não foi possível remover o serviço');
    }
  }
}
