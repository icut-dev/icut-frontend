import { HttpClient } from '~/appRoot/core/domain/protocols';
import { IServiceUpdate, ServiceUpdate } from '~/appRoot/core/domain/usecases';

export class RemoteServiceUpdate implements IServiceUpdate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ServiceUpdate.Result>,
  ) {}

  async update(params: ServiceUpdate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'patch',
      url: `${this.url}/${params.id}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      default:
        throw new Error('Não foi possível atualizar o serviço');
    }
  }
}
