import { useMutation } from '@tanstack/react-query';
import { IUserAvatar, UserAvatar } from '~/appRoot/core/domain/usecases';

interface UseUserAvatar {
  remoteUserAvatar: IUserAvatar;
}

export function useUserAvatar({ remoteUserAvatar }: UseUserAvatar) {
  return useMutation({
    mutationFn: async (data: UserAvatar.Params) =>
      remoteUserAvatar.create(data),
  });
}
