import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { InputText } from '~/appRoot/presentation/components';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import styles from './styles.module.scss';

function AdminEmployeePageComponent() {
  const { handleSubmit, register } = useForm();

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
              <InputText label='Razão social' {...register('corporateName')} />
              <InputText
                label='Responsável legal'
                {...register('representativeName')}
              />
              <InputText label='CNPJ' {...register('cnpj')} />
              <InputText label='E-mail' {...register('email')} />
            </div>

            <div className={styles.buttonsContainer}>
              <button type='button' className={styles.backButton}>
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

export default AdminEmployeePageComponent;
