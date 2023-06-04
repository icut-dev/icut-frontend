import { useRouter } from 'next/navigation';
import InputText from '../../components/form/input-text';

import styles from './register.module.scss';

function RegisterPageComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <p>Crie sua conta</p>

      <form className={styles.form}>
        <InputText name='name' label='Nome completo' />
        <InputText name='email' label='E-mail' />
        <InputText name='password' label='Senha' type='password' />
        <InputText
          name='confirmPassword'
          label='Confirme a senha'
          type='password'
        />

        <button
          className={styles.button}
          type='button'
          onClick={() => router.push('/login')}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPageComponent;
