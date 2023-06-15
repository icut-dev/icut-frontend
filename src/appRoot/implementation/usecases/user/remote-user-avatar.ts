import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import { IUserAvatar, UserAvatar } from '~/appRoot/core/domain/usecases';

export namespace RemoteUserAvatarNamespace {
  export type Model = UserAvatar.Model;
}

export class RemoteUserAvatar implements IUserAvatar {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUserAvatarNamespace.Model>,
  ) {}

  async create(params: UserAvatar.Params): Promise<void> {
    const formData = new FormData();
    formData.append('file', params.file);
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error('Não foi possível Atualizar a foto de perfil');
    }
  }
}
