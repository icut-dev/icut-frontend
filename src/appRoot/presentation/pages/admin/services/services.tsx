import Image from 'next/image';
import { FiClipboard, FiClock, FiEdit } from 'react-icons/fi';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import styles from './styles.module.scss';

function AdminEmployeesPageComponent() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Serviços</h1>
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
              <tr>
                <td>Corte completo</td>

                <td>
                  <div className={styles.time}>
                    <FiClock />
                    <span>1 hora</span>
                  </div>
                </td>

                <td>R$ 50,00</td>

                <td>
                  <span>Ativo</span>
                </td>

                <td className={styles.actions}>
                  <button type='button'>
                    <FiEdit />
                    Editar
                  </button>
                </td>
              </tr>

              <tr>
                <td>Corte simples</td>

                <td>
                  <div className={styles.time}>
                    <FiClock />
                    <span>30 minutos</span>
                  </div>
                </td>

                <td>R$ 30,00</td>

                <td>
                  <span>Ativo</span>
                </td>

                <td className={styles.actions}>
                  <button type='button'>
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

export default AdminEmployeesPageComponent;
