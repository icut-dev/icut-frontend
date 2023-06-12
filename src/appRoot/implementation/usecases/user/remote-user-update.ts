import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IUserUpdate, UserUpdate } from '~/appRoot/core/domain/usecases';

export namespace RemoteUserUpdateNamespace {
  export type Model = UserUpdate.Model;
}

export class RemoteUserUpdate implements IUserUpdate {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUserUpdateNamespace.Model>,
  ) {}

  async update(params: UserUpdate.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'patch',
      url: `${this.url}/${params.id}`,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return;
      default:
        throw new Error(
          'Não foi possível atualizar o usuário. Tente novamente mais tarde.',
        );
    }
  }
}
