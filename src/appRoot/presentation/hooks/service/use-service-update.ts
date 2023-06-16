import { useMutation } from '@tanstack/react-query';
import { ServiceUpdate, IServiceUpdate } from '~/appRoot/core/domain/usecases';

interface UseServiceUpdate {
  remoteServiceUpdate: IServiceUpdate;
}

export function useServiceUpdate({ remoteServiceUpdate }: UseServiceUpdate) {
  return useMutation({
    mutationFn: async (params: ServiceUpdate.Params) =>
      remoteServiceUpdate.update(params),
  });
}
