import Image from 'next/image';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { ServiceModel } from '~/appRoot/core/domain/models';
import { ScheduleContext } from '../../contexts/schedule-context';
import styles from './service-item.module.scss';

interface ServiceItemProps {
  id?: number;
  title: string;
  price: number;
  icon: {
    src: string;
    alt: string;
  };
  service?: ServiceModel;
}

export function ServiceItem({
  id,
  title,
  price,
  icon,
  service,
}: ServiceItemProps) {
  const { setService } = useContext(ScheduleContext);

  const priceFormatted = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price),
    [price],
  );

  if (id && service) {
    return (
      <li>
        <Link href={`/appointment/${id}`} onClick={() => setService(service)}>
          <div className={styles.list_item}>
            <div className={styles.icon_container}>
              <Image src={icon.src} alt={icon.alt} width={60} height={60} />
            </div>

            <div className={styles.list_item_content}>
              <div>
                <span>{title}</span>
                <p>{priceFormatted}</p>
              </div>

              <div className={styles.list_item_content_icon}>
                <HiChevronRight size={24} />
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className={`${styles.list_item} ${styles.list_item_disabled}`}>
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
