import { useQuery } from '@tanstack/react-query';
import {
  ServiceFindById,
  IServiceFindById,
} from '~/appRoot/core/domain/usecases';

interface UseServiceFindById {
  params: ServiceFindById.Params;
  remoteServiceFindById: IServiceFindById;
}

export function useServiceFindById({
  params,
  remoteServiceFindById,
}: UseServiceFindById) {
  return useQuery({
    queryFn: async () => remoteServiceFindById.findById(params),
    queryKey: ['service', params],
  });
}
