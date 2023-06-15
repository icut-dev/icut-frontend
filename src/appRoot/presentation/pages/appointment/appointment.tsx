/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs';
import localePortuguese from 'dayjs/locale/pt-br';
import { useRouter } from 'next/navigation';
import { forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { MdOutlineEditCalendar } from 'react-icons/md';
import {
  IScheduleDayAvailable,
  IEmployeeFindAllByEstablishment,
} from '~/appRoot/core/domain/usecases';
import beardIcon from '../../../../../public/assets/beard.svg';
import { Button, Header, ServiceItem } from '../../components';
import { ScheduleContext } from '../../contexts/schedule-context';
import { mapIcon } from '../service/service';
import styles from './appointment.module.scss';
import { Employees } from './components/employees';
import { Times } from './components/times';

interface Props {
  remoteScheduleDayAvailable: IScheduleDayAvailable;
  remoteEmployeeFindAllByEstablishment: IEmployeeFindAllByEstablishment;
}

function AppointmentPageComponent({
  remoteScheduleDayAvailable,
  remoteEmployeeFindAllByEstablishment,
}: Props) {
  const router = useRouter();
  const { service, date, setDate, employee, time } =
    useContext(ScheduleContext);

  const formatDate = dayjs(date).locale(localePortuguese);

  if (!service) return null;

  const CustomDate = ({ onClick }: any) => (
    <Button type='button' color='blackAlpha' onClick={onClick}>
      <MdOutlineEditCalendar size={20} color='#FF9000' />

      <span>Trocar data</span>
    </Button>
  );

  return (
    <div className={styles.appointment_container}>
      <header className={styles.appointment_header}>
        <Header title='Agendamento' />

        <div className={styles.appointment_info}>
          <ServiceItem
            title={service.description_service}
            price={service.valor}
            icon={{
              alt: service.description_service,
              src: mapIcon[
                (service.type_service as 1 | 2 | 3 | 4 | 5 | 6) || 6
              ],
            }}
          />

          <div className={styles.appointment_date}>
            <span>{formatDate.format('dddd')}</span>

            <p>{formatDate.format('DD [de] MMMM [de] YYYY')}</p>

            <DatePicker
              onChange={setDate}
              selected={date}
              minDate={dayjs().toDate()}
              customInput={<CustomDate />}
            />
          </div>
        </div>
      </header>

      <main className={styles.appointment_main}>
        <Employees
          remoteEmployeeFindAllByEstablishment={
            remoteEmployeeFindAllByEstablishment
          }
        />

        <h2>Horários disponíveis</h2>
        <Times remoteScheduleDayAvailable={remoteScheduleDayAvailable} />
      </main>

      <footer className={styles.appointment_footer}>
        <Button
          type='button'
          disabled={!employee || !time}
          onClick={() => router.push('/payment')}
        >
          Avançar
        </Button>
      </footer>
    </div>
  );
}

export default AppointmentPageComponent;
