import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IEmployeeFindAllByEstablishment } from '~/appRoot/core/domain/usecases';
import { Button } from '~/appRoot/presentation/components';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import { useEmployeeFindAllByEstablishment } from '~/appRoot/presentation/hooks/employee/use-employee-find-by-establishment-id';
import styles from './styles.module.scss';

interface Props {
  remoteEmployeeFindAllByEstablishment: IEmployeeFindAllByEstablishment;
}

function AdminEmployeePageComponent({
  remoteEmployeeFindAllByEstablishment,
}: Props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const employeeFindByEstablishment = useEmployeeFindAllByEstablishment({
    params: { establishmentId: user.id_establishment },
    remoteEmployeeFindAllByEstablishment,
  });

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <div>
            <h1>Funcionários</h1>

            <Button
              color='secondary'
              type='button'
              onClick={() => router.push('/admin/employee/create')}
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
                <th>Telefones</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {employeeFindByEstablishment.data?.map((employee) => (
                <tr key={employee.id_employee}>
                  <td>
                    <span className={styles.userName}>
                      {employee.user.username}
                    </span>
                    <span className={styles.userEmail}>
                      {employee.user.email}
                    </span>
                  </td>

                  <td>
                    <span className={styles.userPhones}>
                      {employee.user.list_telephones?.[0].telephone_number.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        '($1) $2-$3',
                      )}
                      {employee.user.list_telephones.slice(1).length > 0 &&
                        `, +${employee.user.list_telephones.slice(1).length}`}
                    </span>
                  </td>

                  <td>
                    <span>{employee.user.active ? 'Ativo' : 'Inativo'}</span>
                  </td>

                  <td className={styles.actions}>
                    <Button
                      type='button'
                      onClick={
                        () => router.push(`/admin/employee/${employee.id_user}`)
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

export default AdminEmployeePageComponent;
