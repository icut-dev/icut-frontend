import { useMutation } from '@tanstack/react-query';
import {
  EstablishmentUploadLogo,
  IEstablishmentUploadLogo,
} from '~/appRoot/core/domain/usecases';

interface UseEstablishmentUploadLogo {
  remoteEstablishmentUploadLogo: IEstablishmentUploadLogo;
}

export function useEstablishmentUploadLogo({
  remoteEstablishmentUploadLogo,
}: UseEstablishmentUploadLogo) {
  return useMutation({
    mutationFn: async (data: EstablishmentUploadLogo.Params) =>
      remoteEstablishmentUploadLogo.update(data),
  });
}
