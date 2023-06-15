import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BadRequestError } from '~/appRoot/core/domain/errors';
import { IServiceCreate } from '~/appRoot/core/domain/usecases';
import {
  Button,
  Fieldset,
  InputSelect,
  InputText,
  Sidebar,
} from '~/appRoot/presentation/components';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import { useServiceCreate } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteServiceCreate: IServiceCreate;
}

interface ServiceCreateForm {
  value: number;
  description: string;
  typeService: number;
  timeDuration: string;
}

const schema = yup.object({
  value: yup
    .number()
    .typeError('Por favor, informe o valor do serviço')
    .required('Por favor, informe o valor do serviço'),
  typeService: yup.number().required('Por favor, informe o tipo do serviço'),
  description: yup
    .string()
    .required('Por favor, informe a descrição do serviço'),
  timeDuration: yup
    .string()
    .required('Por favor, informe a duração do serviço'),
});

function AdminServiceCreatePageComponent({ remoteServiceCreate }: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ServiceCreateForm>({
    resolver: yupResolver(schema),
  });

  const serviceCreate = useServiceCreate({
    remoteServiceCreate,
  });

  const onSubmit = async (data: ServiceCreateForm) => {
    await serviceCreate.mutateAsync({
      valor: data.value,
      type_service: data.typeService,
      time_duration: data.timeDuration,
      description_service: data.description,
      id_establishment: user.id_establishment,
    });
  };

  useEffect(() => {
    if (serviceCreate.isSuccess) {
      toast.success('Funcionário adicionado com sucesso!');
      router.push('/admin/employee');
    }

    if (serviceCreate.isError) {
      toast.error((serviceCreate.error as BadRequestError).message);
    }
  }, [
    router,
    serviceCreate.error,
    serviceCreate.isError,
    serviceCreate.isSuccess,
  ]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Adicionar serviço</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Fieldset>
              <InputText
                error={errors.description}
                label='Descrição do serviço'
                {...register('description')}
              />

              <InputText
                error={errors.value}
                label='Valor do serviço'
                {...register('value')}
              />

              <InputSelect
                error={errors.timeDuration}
                label='Duração'
                options={[
                  {
                    label: '30 minutos',
                    value: '00:30:00',
                  },
                  {
                    label: '1 hora',
                    value: '01:00:00',
                  },
                  {
                    label: '1 hora e 30 minutos',
                    value: '01:30:00',
                  },
                  {
                    label: '2 horas',
                    value: '02:00:00',
                  },
                  {
                    label: '2 horas e 30 minutos',
                    value: '02:30:00',
                  },
                ]}
                {...register('timeDuration')}
              />

              <InputSelect
                error={errors.typeService}
                label='Tipo de serviço'
                options={[
                  {
                    label: 'Cabelo',
                    value: 1,
                  },
                  {
                    label: 'Barba e bigode',
                    value: 2,
                  },
                  {
                    label: 'Tingimento e Luzes',
                    value: 3,
                  },
                  {
                    label: 'Manicure',
                    value: 4,
                  },
                  {
                    label: 'Pedicure',
                    value: 5,
                  },
                  {
                    label: 'Outros',
                    value: 6,
                  },
                ]}
                {...register('typeService')}
              />
            </Fieldset>

            <div className={styles.buttonsContainer}>
              <Button
                color='blackAlpha'
                type='button'
                className={styles.backButton}
                onClick={() => router.back()}
              >
                Voltar
              </Button>

              <Button
                type='submit'
                className={styles.editButton}
                isLoading={serviceCreate.isLoading}
              >
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

export default AdminServiceCreatePageComponent;
