import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, cloneElement } from 'react';
import styles from './styles.module.scss';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = usePathname();

  let isActive = false;

  if (pathname.includes(String(rest.href))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: isActive ? styles.active : '',
      })}
    </Link>
  );
}
