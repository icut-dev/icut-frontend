import { useMutation } from '@tanstack/react-query';
import { PreconditionFailedError } from '~/appRoot/core/domain/errors/precondition-failed';
import {
  CreateUser,
  ICreateUser,
} from '~/appRoot/core/domain/usecases/create-user';

interface UseCreateUser {
  remoteCreateUser: ICreateUser;
}

export function useCreateUser({ remoteCreateUser }: UseCreateUser) {
  return useMutation({
    mutationFn: async (data: CreateUser.Params) =>
      remoteCreateUser.create(data),
  });
}
