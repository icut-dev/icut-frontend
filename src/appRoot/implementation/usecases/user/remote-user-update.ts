import { PreconditionFailedError } from '~/appRoot/core/domain/errors/precondition-failed';
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
      case HttpStatusCodeEnum.preconditionFailed:
        throw new PreconditionFailedError(
          'As informações de login já estão sendo utilizadas',
        );
      default:
        break;
    }
  }
}
