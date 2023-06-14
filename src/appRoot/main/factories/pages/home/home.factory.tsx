import { HomeTag } from '~/appRoot/presentation/pages/home';
import { makeRemoteEstablishmentFindAll } from '../../usecases/establishment/remote-establishment-find-all';

export const makeHome = () => (
  <HomeTag remoteEstablishmentFindAll={makeRemoteEstablishmentFindAll()} />
);
