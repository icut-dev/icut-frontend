import { useRouter } from 'next/navigation';
import InputText from '../../components/form/input-text';

import styles from './styles.module.scss';
import { Header } from '../../components';

function ProfilePageComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header title='Meu perfil' />

      <form className={styles.form}>
        <InputText name='name' label='Nome completo' />
        <InputText name='email' label='E-mail' />
        <InputText name='password' label='Senha' type='password' />

        <footer className={styles.create_payment_method_footer}>
          <button
            className={styles.button}
            type='button'
            onClick={() => router.push('/home')}
          >
            Confirmar mudanças
          </button>

          <button
            className={styles.outline_button}
            type='button'
            onClick={() => router.push('/login')}
          >
            Sair
          </button>
        </footer>
      </form>
    </div>
  );
}

export default ProfilePageComponent;
