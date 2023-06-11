import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  PhoneFindAllByUserId,
  IPhoneFindAllByUserId,
} from '~/appRoot/core/domain/usecases';

export class RemotePhoneFindAllByUserId implements IPhoneFindAllByUserId {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<PhoneFindAllByUserId.Result>,
  ) {}

  async findByUserId(
    params: PhoneFindAllByUserId.Params,
  ): Promise<PhoneFindAllByUserId.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.userId}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.ok:
        return httpResponse.body;
      default:
        throw new Error('Não foi possível encontrar o usuário');
    }
  }
}
