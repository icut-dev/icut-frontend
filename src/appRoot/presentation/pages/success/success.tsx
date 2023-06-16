import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { HiCheck } from 'react-icons/all';
import { dayjs } from '~/appRoot/infra/utils';
import { ScheduleContext } from '../../contexts/schedule-context';
import styles from './success.module.scss';

function SuccessPageComponent() {
  const router = useRouter();

  const { date, time, employee, onReset } = useContext(ScheduleContext);

  if (!date || !time || !employee) return null;

  const [hour, minute] = time.split(':');
  const formattedDate = dayjs(date).hour(+hour).minute(+minute);

  return (
    <div className={styles.success_container}>
      <HiCheck size={88} />

      <span>Agendamento concluído</span>

      <p>
        {formattedDate.format('dddd, DD [de] MMMM [de] YYYY [às] HH:mm')}, com{' '}
        {employee?.user.first_name}
      </p>

      <button
        type='button'
        onClick={() => {
          onReset();
          router.push('/home');
        }}
      >
        Confirmar
      </button>
    </div>
  );
}

export default SuccessPageComponent;
