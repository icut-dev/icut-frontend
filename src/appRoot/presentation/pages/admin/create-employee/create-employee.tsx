import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import * as yup from 'yup';
import { Sidebar, InputText } from '~/appRoot/presentation/components';
import styles from './styles.module.scss';

const schema = yup.object({
  name: yup.string().required('Por favor, informe seu nome'),
  lastName: yup.string().required('Por favor, informe seu último nome'),
  cpf: yup.string().required('Por favor, informe seu CPF'),
  email: yup.string().required('Por favor, informe seu e-mail'),
  phoneNumber: yup.string().required('Por favor, informe seu telefone'),
});

function AdminCreateEmployeePageComponent() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Adicionar funcionário</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputsContainer}>
              <InputText
                label='Nome'
                error={errors.name}
                {...register('name')}
              />

              <InputText
                label='Último nome'
                error={errors.lastName}
                {...register('lastName')}
              />
              <InputText label='CPF' error={errors.cpf} {...register('cpf')} />

              <InputText
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />

              <InputText
                label='Telefone'
                error={errors.phoneNumber}
                {...register('phoneNumber')}
              />
            </div>

            <div className={styles.buttonsContainer}>
              <button
                type='button'
                className={styles.backButton}
                onClick={() => router.back()}
              >
                Voltar
              </button>

              <button type='submit' className={styles.editButton}>
                <FiEdit />
                Salvar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminCreateEmployeePageComponent;
