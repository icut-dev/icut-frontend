import { useQuery } from '@tanstack/react-query';
import {
  ServiceFindAllByEstablishment,
  IServiceFindAllByEstablishment,
} from '~/appRoot/core/domain/usecases';

interface UseServiceFindAllByEstablishment {
  params: ServiceFindAllByEstablishment.Params;
  remoteServiceFindAllByEstablishment: IServiceFindAllByEstablishment;
}

export function useServiceFindAllByEstablishment({
  params,
  remoteServiceFindAllByEstablishment,
}: UseServiceFindAllByEstablishment) {
  return useQuery({
    queryFn: async () =>
      remoteServiceFindAllByEstablishment.findAllByEstablishment(params),
    queryKey: ['services-establishment', params],
  });
}
