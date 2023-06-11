import { useMutation } from '@tanstack/react-query';
import {
  EstablishmentUpdate,
  IEstablishmentUpdate,
} from '~/appRoot/core/domain/usecases';

interface UseEstablishmentUpdate {
  remoteEstablishmentUpdate: IEstablishmentUpdate;
}

export function useEstablishmentUpdate({
  remoteEstablishmentUpdate,
}: UseEstablishmentUpdate) {
  return useMutation({
    mutationFn: async (data: EstablishmentUpdate.Params) =>
      remoteEstablishmentUpdate.update(data),
  });
}
