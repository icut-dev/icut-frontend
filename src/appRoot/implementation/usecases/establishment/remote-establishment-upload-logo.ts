import {
  HttpClient,
  HttpStatusCodeEnum,
} from '~/appRoot/core/domain/protocols';
import {
  EstablishmentUploadLogo,
  IEstablishmentUploadLogo,
} from '~/appRoot/core/domain/usecases';

export class RemoteEstablishmentUploadLogo implements IEstablishmentUploadLogo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EstablishmentUploadLogo.Model>,
  ) {}

  async update(params: EstablishmentUploadLogo.Params): Promise<void> {
    const formData = new FormData();
    formData.append('file', params.logo);

    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: `${this.url}/${params.id}`,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.created:
        return;
      default:
        throw new Error(
          'Não foi possível atualizar o logo do estabelecimento. Tente novamente mais tarde.',
        );
    }
  }
}
