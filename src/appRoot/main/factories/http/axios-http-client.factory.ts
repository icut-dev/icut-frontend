import { AxiosHttpClient } from '~/appRoot/infra/http';

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();
