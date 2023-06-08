import Link from 'next/link';
import {
  FiCalendar,
  FiClipboard,
  FiCoffee,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import styles from './styles.module.scss';

export function Sidebar() {
  return (
    <aside className={styles.container}>
      <div>
        <ul className={`${styles.nav_list}`}>
          <li className={`${styles.nav_link}`}>
            <Link href='/admin/dashboard'>
              <FiCalendar />
              <span>Agendamentos</span>
            </Link>
          </li>

          <li className={`${styles.nav_link}`}>
            <Link href='/admin/dashboard'>
              <FiClipboard />
              <span>Serviços</span>
            </Link>
          </li>

          <li className={`${styles.nav_link} ${styles.active}`}>
            <Link href='/admin/dashboard'>
              <FiUsers />
              <span>Funcionários</span>
            </Link>
          </li>

          <li className={`${styles.nav_link} ${styles.active}`}>
            <Link href='/admin/dashboard'>
              <FiSettings />
              <span>Configuração</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
