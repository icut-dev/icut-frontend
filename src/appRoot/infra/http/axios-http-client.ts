import axios, { AxiosResponse } from 'axios';
import {
  HttpRequestParams,
  HttpResponse,
  HttpClient,
} from '~/appRoot/core/domain/protocols/http';

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly bearerToken: string) {}

  // eslint-disable-next-line class-methods-use-this
  async request(data: HttpRequestParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          ...data.headers,
        },
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
