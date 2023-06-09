import { FiCalendar, FiClipboard, FiSettings, FiUsers } from 'react-icons/fi';
import { NavLink } from './nav-link';
import styles from './styles.module.scss';

export function Sidebar() {
  return (
    <aside className={styles.container}>
      <div>
        <ul className={`${styles.nav_list}`}>
          <NavLink href='/admin/appointment' icon={FiCalendar}>
            Agendamentos
          </NavLink>

          <NavLink href='/admin/service' icon={FiClipboard}>
            Serviços
          </NavLink>

          <NavLink href='/admin/employee' icon={FiUsers}>
            Funcionários
          </NavLink>

          <NavLink href='/admin/setting' icon={FiSettings}>
            Configuração
          </NavLink>
        </ul>
      </div>
    </aside>
  );
}
