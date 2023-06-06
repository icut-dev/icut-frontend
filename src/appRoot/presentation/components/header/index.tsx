import { useRouter } from 'next/navigation';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import styles from './styles.module.scss';

interface HeaderProps {
  title: string;
  onClickLeft?: () => void;
}

export function Header({ title, onClickLeft }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <HiOutlineChevronLeft size={24} onClick={onClickLeft || router.back} />

      <h1>{title}</h1>
    </header>
  );
}
