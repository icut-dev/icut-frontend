import { ApiError } from '~/appRoot/core/domain/errors/abstract-error';
import { BadRequestError } from '~/appRoot/core/domain/errors/bad-request-error';
import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IServiceCreate, ServiceCreate } from '~/appRoot/core/domain/usecases';

export class RemoteServiceCreate implements IServiceCreate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ServiceCreate.Result>,
  ) {}

  async create(params: ServiceCreate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: `${this.url}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
      case HttpStatusCodeEnum.created:
        return;
      case HttpStatusCodeEnum.badRequest:
        throw new BadRequestError(httpResponse.body as any);
      default:
        throw new Error('Não foi possível atualizar o serviço');
    }
  }
}
