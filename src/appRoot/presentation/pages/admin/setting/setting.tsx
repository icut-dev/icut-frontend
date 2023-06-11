import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import * as yup from 'yup';
import { Sidebar, Button, InputText } from '~/appRoot/presentation/components';
import styles from './styles.module.scss';

interface EstablishmentUpdateForm {
  cnpj: string;
  logo: string;
  email: string;
  corporateName: string;
  representativeName: string;
}

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
  } = useForm<EstablishmentUpdateForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: EstablishmentUpdateForm) => {
    console.log(data);
  };

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
                placeholder='Ex.: 00.000.000/0000-00'
                error={errors.cnpj}
                {...register('cnpj')}
              />

              <InputText
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />

              <InputText
                label='Logo url'
                error={errors.logo}
                {...register('logo')}
              />
            </div>

            <div className={styles.buttonsContainer}>
              <Button type='submit' className={styles.editButton}>
                <FiEdit />
                Salvar
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminEmployeePageComponent;
