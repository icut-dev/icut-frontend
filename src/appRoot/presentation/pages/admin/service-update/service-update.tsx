import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  IServiceFindById,
  IServiceUpdate,
} from '~/appRoot/core/domain/usecases';
import {
  Button,
  Fieldset,
  InputSelect,
  InputText,
  Sidebar,
} from '~/appRoot/presentation/components';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import {
  useServiceFindById,
  useServiceUpdate,
} from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  serviceId: number;
  remoteServiceUpdate: IServiceUpdate;
  remoteServiceFindById: IServiceFindById;
}

interface ServiceUpdateForm {
  value: number;
  typeService: number;
  description: string;
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

function AdminServiceUpdatePageComponent({
  serviceId,
  remoteServiceUpdate,
  remoteServiceFindById,
}: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ServiceUpdateForm>({
    resolver: yupResolver(schema),
  });

  const serviceUpdate = useServiceUpdate({
    remoteServiceUpdate,
  });
  const serviceFindById = useServiceFindById({
    params: { id: serviceId },
    remoteServiceFindById,
  });

  const onSubmit = async (data: ServiceUpdateForm) => {
    await serviceUpdate.mutateAsync({
      id: serviceId,
      valor: data.value,
      type_service: data.typeService,
      time_duration: data.timeDuration,
      description_service: data.description,
      id_establishment: user.id_establishment,
    });
  };

  useEffect(() => {
    if (serviceUpdate.isError) {
      toast.error((serviceUpdate.error as Error).message);
    }

    if (serviceUpdate.isSuccess) {
      toast.success('Serviço atualizado com sucesso');
    }
  }, [serviceUpdate.error, serviceUpdate.isError, serviceUpdate.isSuccess]);

  useEffect(() => {
    if (!serviceFindById.data) return;

    setValue('value', serviceFindById.data.valor);
    setValue('description', serviceFindById.data.description_service);
    setValue('typeService', serviceFindById.data.type_service);
    setValue('timeDuration', serviceFindById.data.time_duration);
  }, [serviceFindById.data, setValue]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Detalhes do serviço</h1>
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
                type='number'
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
                isLoading={serviceUpdate.isLoading}
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

export default AdminServiceUpdatePageComponent;
