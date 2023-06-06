import Link from 'next/link';
import Image from 'next/image';
import { HiChevronRight } from 'react-icons/hi';

import styles from './service-item.module.scss';
import { useMemo } from 'react';

interface ServiceItemProps {
  id?: string;
  title: string;
  price: number;
  icon: {
    src: string;
    alt: string;
  };
}

export function ServiceItem({ id, title, price, icon }: ServiceItemProps) {
  const priceFormatted = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }, [price]);

  if (id) {
    return (
      <li>
        <Link href={`/appointment/${id}`}>
          <div className={styles.list_item}>
            <div className={styles.icon_container}>
              <Image src={icon.src} alt={icon.alt} width={60} height={60} />
            </div>

            <div className={styles.list_item_content}>
              <div>
                <span>{title}</span>
                <p>{priceFormatted}</p>
              </div>

              <HiChevronRight size={24} />
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className={styles.list_item}>
        <div className={styles.icon_container}>
          <Image src={icon.src} alt={icon.alt} width={60} height={60} />
        </div>

        <div className={styles.list_item_content}>
          <div>
            <span>{title}</span>
            <p>{priceFormatted}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
