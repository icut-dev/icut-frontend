import { useMutation } from '@tanstack/react-query';
import { UserCreate, IUserCreate } from '~/appRoot/core/domain/usecases';

interface UseCreateUser {
  remoteCreateUser: IUserCreate;
}

export function useCreateUser({ remoteCreateUser }: UseCreateUser) {
  return useMutation({
    mutationFn: async (data: UserCreate.Params) =>
      remoteCreateUser.create(data),
  });
}
