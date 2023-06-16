import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputText } from '../../components';
import { AuthContext } from '../../contexts/auth-context';
import styles from './login.module.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Por favor, informe seu e-mail'),
  password: yup.string().required('Por favor, informe sua senha'),
});
function LoginPageComponent() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signIn, loading } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    await signIn({ email: data.email, password: data.password });
  };

  return (
    <div className={styles.container}>
      <p>Faça seu login</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputText
          error={errors?.email}
          label='E-mail'
          {...register('email')}
        />
        <InputText
          error={errors?.password}
          label='Senha'
          type='password'
          {...register('password')}
        />
        <button type='submit' className={styles.button}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>

      <div className={styles.footer}>
        <Link href='/register'>
          Não possui conta? <strong>Clique aqui</strong> para fazer o seu
          cadastro
        </Link>
      </div>
    </div>
  );
}

export default LoginPageComponent;
