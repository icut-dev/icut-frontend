import { useMutation } from '@tanstack/react-query';
import { ServiceDelete, IServiceDelete } from '~/appRoot/core/domain/usecases';
import { queryClient } from '~/appRoot/infra/http/query-client';

interface UseServiceDelete {
  remoteServiceDelete: IServiceDelete;
}

export function useServiceDelete({ remoteServiceDelete }: UseServiceDelete) {
  return useMutation({
    mutationFn: async (params: ServiceDelete.Params) =>
      remoteServiceDelete.delete(params),
    onSuccess() {
      queryClient.invalidateQueries(['services-establishment']);
    },
  });
}
