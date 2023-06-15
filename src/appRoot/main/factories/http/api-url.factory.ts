import { API_URL } from '~/config/vars';

export const makeApiUrl = (path: string): string =>
  `${API_URL || 'http://localhost:4444'}${path}`;
