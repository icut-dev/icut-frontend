import { useQuery } from '@tanstack/react-query';
import {
  EstablishmentFindById,
  IEstablishmentFindById,
} from '~/appRoot/core/domain/usecases';

interface UseEstablishmentFindById {
  params: EstablishmentFindById.Params;
  remoteEstablishmentFindById: IEstablishmentFindById;
}

export function useEstablishmentFindById({
  params,
  remoteEstablishmentFindById,
}: UseEstablishmentFindById) {
  return useQuery({
    queryFn: async () => remoteEstablishmentFindById.findById(params),
    queryKey: ['establishment', params],
  });
}
