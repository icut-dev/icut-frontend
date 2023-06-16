import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IUserCreate, UserCreate } from '~/appRoot/core/domain/usecases';

export namespace RemoteUserCreateNamespace {
  export type Model = UserCreate.Model;
}

export class RemoteUserCreate implements IUserCreate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUserCreateNamespace.Model>,
  ) {}

  async create(params: UserCreate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error('Não foi possível cadastrar o usuário');
    }
  }
}
