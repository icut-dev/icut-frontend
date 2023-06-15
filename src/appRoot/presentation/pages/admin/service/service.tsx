import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { FiClock, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  IServiceFindAllByEstablishment,
  IServiceDelete,
} from '~/appRoot/core/domain/usecases';
import { formatCurrency, formatTime } from '~/appRoot/infra/utils';
import { Button } from '~/appRoot/presentation/components';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import {
  useServiceDelete,
  useServiceFindAllByEstablishment,
} from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteServiceDelete: IServiceDelete;
  remoteServiceFindAllByEstablishment: IServiceFindAllByEstablishment;
}

function AdminServicePageComponent({
  remoteServiceDelete,
  remoteServiceFindAllByEstablishment,
}: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const serviceDelete = useServiceDelete({
    remoteServiceDelete,
  });

  const serviceFindAllByEstablishment = useServiceFindAllByEstablishment({
    params: { establishmentId: user.id_establishment },
    remoteServiceFindAllByEstablishment,
  });

  const handleDelete = async (serviceId: number) => {
    await serviceDelete.mutateAsync({ id: serviceId });
  };

  useEffect(() => {
    if (serviceDelete.isSuccess) {
      toast.success('Serviço removido com sucesso!');
    }

    if (serviceDelete.isError) {
      toast.error((serviceDelete.error as Error).message);
    }
  }, [
    router,
    serviceDelete.error,
    serviceDelete.isError,
    serviceDelete.isSuccess,
  ]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <div>
            <h1>Serviços</h1>

            <Button
              color='secondary'
              type='button'
              onClick={() => router.push('/admin/service/create')}
            >
              Adicionar
            </Button>
          </div>
        </section>

        <section>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tempo</th>
                <th>Valor</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {serviceFindAllByEstablishment.data?.map((service) => (
                <tr key={String(service.id)}>
                  <td>{service.description_service}</td>

                  <td>
                    <div className={styles.time}>
                      <FiClock />
                      <span>{formatTime(service.time_duration)}</span>
                    </div>
                  </td>

                  <td>{formatCurrency(service.valor)}</td>

                  <td>
                    <span>{service.active ? 'Ativo' : 'Inativo'}</span>
                  </td>

                  <td className={styles.actions}>
                    <Button
                      color='delete'
                      type='button'
                      onClick={() => handleDelete(service.id)}
                    >
                      Remover
                    </Button>
                    <Button
                      type='button'
                      onClick={
                        () => router.push(`/admin/service/${service.id}`)
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                    >
                      <FiEdit />
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminServicePageComponent;
