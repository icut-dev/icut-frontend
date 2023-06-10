import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import * as yup from 'yup';
import { InputText } from '~/appRoot/presentation/components';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import styles from './styles.module.scss';

const schema = yup.object().shape({
  corporateName: yup.string().required('Por favor, informe a razão social'),
  representativeName: yup
    .string()
    .required('Por favor, informe o nome do responsável legal'),
  cnpj: yup.string().required('Por favor, informe o CNPJ'),
  email: yup
    .string()
    .required('Por favor, informe o e-mail')
    .email('E-mail inválido'),
});

function AdminEmployeePageComponent() {
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
          <h1>Configuração do estabelecimento</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputsContainer}>
              <InputText
                label='Razão social'
                error={errors.corporateName}
                {...register('corporateName')}
              />

              <InputText
                label='Responsável legal'
                error={errors.representativeName}
                {...register('representativeName')}
              />

              <InputText
                label='CNPJ'
                error={errors.cnpj}
                {...register('cnpj')}
              />

              <InputText
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />
            </div>

            <div className={styles.buttonsContainer}>
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

export default AdminEmployeePageComponent;
