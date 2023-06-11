import { HttpClient } from '~/appRoot/core/domain/protocols';
import {
  EmployeeDelete,
  IEmployeeDelete,
} from '~/appRoot/core/domain/usecases';

export class RemoteEmployeeDelete implements IEmployeeDelete {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeDelete.Result>,
  ) {}

  async delete(params: EmployeeDelete.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'delete',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      default:
        throw new Error('Não foi possível remover o serviço');
    }
  }
}
