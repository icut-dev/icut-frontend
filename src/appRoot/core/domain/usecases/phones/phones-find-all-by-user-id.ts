import { PreconditionFailedError } from '../../errors/precondition-failed';
import { PhoneModel } from '../../models';

export namespace PhoneFindAllByUserId {
  export type Params = {
    userId: number;
  };

  export type Model = PhoneModel;

  export type Result = Model[] | undefined;
}

export interface IPhoneFindAllByUserId {
  findByUserId(
    params: PhoneFindAllByUserId.Params,
  ): Promise<PhoneFindAllByUserId.Result>;
}
