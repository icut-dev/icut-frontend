import { LoginProps } from '~/appRoot/core/domain/pages';
import { LoginTag } from '~/appRoot/presentation/pages/login';

export const makeLogin = (props: LoginProps) => {
  const { message } = props;
  return <LoginTag message={message} />;
};
