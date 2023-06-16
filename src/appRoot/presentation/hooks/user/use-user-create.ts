import { useMutation } from '@tanstack/react-query';
import { UserCreate, IUserCreate } from '~/appRoot/core/domain/usecases';

interface UseUserCreate {
  remoteCreateUser: IUserCreate;
}

export function useUserCreate({ remoteCreateUser }: UseUserCreate) {
  return useMutation({
    mutationFn: async (data: UserCreate.Params) =>
      remoteCreateUser.create(data),
  });
}
