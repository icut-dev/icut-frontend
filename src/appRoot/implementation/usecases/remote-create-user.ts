import { PreconditionFailedError } from '~/appRoot/core/domain/errors/precondition-failed';
import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  ICreateUser,
  CreateUser,
} from '~/appRoot/core/domain/usecases/create-user';

export namespace RemoteCreateUserNamespace {
  export type Model = CreateUser.Model;
}

export class RemoteCreateUser implements ICreateUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteCreateUserNamespace.Model>,
  ) {}

  async create(params: CreateUser.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
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
