import { useMutation } from '@tanstack/react-query';
import { ServiceCreate, IServiceCreate } from '~/appRoot/core/domain/usecases';

interface UseServiceCreate {
  remoteServiceCreate: IServiceCreate;
}

export function useServiceCreate({ remoteServiceCreate }: UseServiceCreate) {
  return useMutation({
    mutationFn: async (params: ServiceCreate.Params) =>
      remoteServiceCreate.create(params),
  });
}
