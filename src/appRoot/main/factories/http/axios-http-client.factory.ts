import { parseCookies } from 'nookies';
import { AxiosHttpClient } from '~/appRoot/infra/http';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  const cookies = parseCookies();

  return new AxiosHttpClient(cookies['icut.token']);
};
