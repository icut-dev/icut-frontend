import { useContext } from 'react';
import { FiCalendar, FiClipboard, FiSettings, FiUsers } from 'react-icons/fi';
import { UserRole } from '~/appRoot/core/domain/models';
import { AuthContext } from '../../contexts/auth-context';
import { NavLink } from './nav-link';
import styles from './styles.module.scss';

export function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className={styles.container}>
      <div>
        <ul className={`${styles.nav_list}`}>
          <NavLink href='/admin/appointment' icon={FiCalendar}>
            Agendamentos
          </NavLink>

          {user.user_type === UserRole.ADMIN && (
            <>
              <NavLink href='/admin/service' icon={FiClipboard}>
                Serviços
              </NavLink>

              <NavLink href='/admin/employee' icon={FiUsers}>
                Funcionários
              </NavLink>

              <NavLink href='/admin/setting' icon={FiSettings}>
                Configuração
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}
