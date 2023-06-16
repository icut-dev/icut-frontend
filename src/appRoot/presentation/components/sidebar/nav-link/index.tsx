import { LiHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { ActiveLink } from '../active-link';
import styles from './styles.module.scss';

interface NavLinkProps extends LiHTMLAttributes<HTMLLIElement> {
  children: string;
  href: string;
  icon: IconType;
}

export function NavLink({ children, href, icon: Icon, ...rest }: NavLinkProps) {
  return (
    <li data-testid={href} className={styles.nav_link} {...rest}>
      <ActiveLink href={href} passHref>
        <div>
          <Icon size={20} />
          <span>{children}</span>
        </div>
      </ActiveLink>
    </li>
  );
}
