import { useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import styles from './styles.module.scss';

function AdminEmployeePageComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <div>
            <h1>Funcionários</h1>

            <button
              type='button'
              className={styles.add_button}
              onClick={() => router.push('/admin/employee/create')}
            >
              Adicionar
            </button>
          </div>
        </section>

        <section>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Agend.</th>
                <th>Telefones</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <span className={styles.userName}>Marcos Henrique</span>
                  <span className={styles.userEmail}>email@email.com</span>
                </td>

                <td>9</td>

                <td>
                  <span className={styles.userPhones}>
                    (11) 99999-9999, (12) 99999-9999, (12) 99999-9999, (12)
                    99999-9999
                  </span>
                </td>

                <td>
                  <span>Ativo</span>
                </td>

                <td className={styles.actions}>
                  <button
                    type='button'
                    onClick={() => router.push('/admin/employee/create')}
                  >
                    <FiEdit />
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminEmployeePageComponent;
