import { LoginProps } from '~/appRoot/core/domain/pages';

function LoginPageComponent(props: LoginProps) {
  const { message } = props;

  return (
    <div>
      <p>{message || 'Olá'}</p>
      <p>Login</p>
    </div>
  );
}

export default LoginPageComponent;
