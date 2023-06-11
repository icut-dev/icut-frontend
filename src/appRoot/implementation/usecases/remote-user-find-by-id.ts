import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IUserFindById, UserFindById } from '~/appRoot/core/domain/usecases';

export namespace RemoteUserFindByIdNamespace {
  export type Model = UserFindById.Model;
}

export class RemoteUserFindById implements IUserFindById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUserFindByIdNamespace.Model>,
  ) {}

  async findById(params: UserFindById.Params): Promise<UserFindById.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível encontrar o usuário');
    }
  }
}
