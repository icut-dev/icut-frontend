import { useMutation } from '@tanstack/react-query';
import {
  Authentication,
  IAuthentication,
} from '~/appRoot/core/domain/usecases';

interface UseLogin {
  remote: IAuthentication;
}

export function useLogin({ remote }: UseLogin) {
  return useMutation({
    mutationFn: async (data: Authentication.Params) => remote.login(data),
  });
}
