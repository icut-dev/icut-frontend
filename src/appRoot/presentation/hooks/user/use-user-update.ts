import { useMutation } from '@tanstack/react-query';
import { UserUpdate, IUserUpdate } from '~/appRoot/core/domain/usecases';

interface UseUserUpdate {
  remoteUserUpdate: IUserUpdate;
}

export function useUserUpdate({ remoteUserUpdate }: UseUserUpdate) {
  return useMutation({
    mutationFn: async (data: UserUpdate.Params) =>
      remoteUserUpdate.update(data),
  });
}
