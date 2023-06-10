import { yupResolver } from '@hookform/resolvers/yup';
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

  const { signIn } = useContext(AuthContext);

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
          Entrar
        </button>
      </form>

      <footer>Made by team ICUT - DEVELOP</footer>
    </div>
  );
}

export default LoginPageComponent;
