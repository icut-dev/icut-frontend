import { HomeTag } from '~/appRoot/presentation/pages/home';
import { makeRemoteScheduleFindAll } from '../../usecases';
import { makeRemoteEstablishmentFindAll } from '../../usecases/establishment/remote-establishment-find-all';

export const makeHome = () => (
  <HomeTag
    remoteScheduleFindAll={makeRemoteScheduleFindAll()}
    remoteEstablishmentFindAll={makeRemoteEstablishmentFindAll()}
  />
);
