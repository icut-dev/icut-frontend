import { useMutation } from '@tanstack/react-query';
import { CreateUser, ICreateUser } from '~/appRoot/core/domain/usecases';

interface UseCreateUser {
  remoteCreateUser: ICreateUser;
}

export function useCreateUser({ remoteCreateUser }: UseCreateUser) {
  return useMutation({
    mutationFn: async (data: CreateUser.Params) =>
      remoteCreateUser.create(data),
  });
}
