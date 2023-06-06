import { useRouter } from 'next/navigation';
import InputText from '../../components/form/input-text';

import styles from './login.module.scss';

function LoginPageComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <p>Faça seu login</p>

      <form className={styles.form}>
        <InputText name='email' label='E-mail' />
        <InputText name='password' label='Senha' type='password' />

        <button
          className={styles.button}
          type='button'
          onClick={() => router.push('/home')}
        >
          Entrar
        </button>
      </form>

      <footer>Made by team ICUT - DEVELOP</footer>
    </div>
  );
}

export default LoginPageComponent;
