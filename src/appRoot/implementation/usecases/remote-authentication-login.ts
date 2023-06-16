import { UnauthorizedError } from '~/appRoot/core/domain/errors';
import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  IAuthentication,
  Authentication,
} from '~/appRoot/core/domain/usecases';

export namespace RemoteAuthenticationLoginNamespace {
  export type Model = Authentication.Model;
}

export class RemoteAuthenticationLogin implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthenticationLoginNamespace.Model>,
  ) {}

  async login(params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      case HttpStatusCodeEnum.unauthorized:
        throw new UnauthorizedError('Email ou senha inválidos');
      default:
        return undefined;
    }
  }
}
