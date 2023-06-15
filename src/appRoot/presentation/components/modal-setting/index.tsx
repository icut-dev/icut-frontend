/* eslint-disable jsx-a11y/label-has-associated-control */
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { ScheduleModel } from '~/appRoot/core/domain/models';
import {
  IScheduleDayAvailable,
  IScheduleDelete,
  IScheduleUpdate,
} from '~/appRoot/core/domain/usecases';
import { Button, InputSelect } from '..';
import { useScheduleDayAvailable } from '../../hooks';
import { useScheduleDelete } from '../../hooks/schedule/use-schedule-delete';
import { useScheduleUpdate } from '../../hooks/schedule/use-schedule-update';
import styles from './styles.module.scss';

interface ModalSettingProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: ScheduleModel;
  remoteScheduleDelete: IScheduleDelete;
  remoteScheduleUpdate: IScheduleUpdate;
  remoteScheduleDayAvailable: IScheduleDayAvailable;
}

export function ModalSetting({
  isOpen,
  onClose,
  schedule,
  remoteScheduleDelete,
  remoteScheduleUpdate,
  remoteScheduleDayAvailable,
}: ModalSettingProps) {
  const router = useRouter();

  const formattedDate = dayjs(schedule.dt_schedule_initial);

  const [date, setDate] = useState<Date | null>(formattedDate.toDate());

  const scheduleDelete = useScheduleDelete({
    remoteScheduleDelete,
  });

  const scheduleUpdate = useScheduleUpdate({
    remoteScheduleUpdate,
  });

  const scheduleDayAvailable = useScheduleDayAvailable({
    params: {
      employeeId: schedule.fk_id_employee,
      day: dayjs(date).date(),
      month: dayjs(date).month() + 1,
      year: dayjs(date).year(),
    },
    remoteScheduleDayAvailable,
  });

  const [time, setTime] = useState('');

  const handleCancel = async () => {
    await scheduleDelete.mutateAsync({
      id: schedule.id_schedules,
    });

    onClose();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!date || !time || time === '') return;

    const [hours, minutes] = time.split(':');

    await scheduleUpdate.mutateAsync({
      id: schedule.id_schedules,
      date_start: dayjs(date).hour(+hours).minute(+minutes).toDate(),
    });

    onClose();
  };

  const formattedTime = useMemo(() => {
    if (!scheduleDayAvailable.data) return [];

    return scheduleDayAvailable.data.map((item) => {
      const formatTime = `${String(item.hour).padStart(2, '0')}:${String(
        item.minutes,
      ).padStart(2, '0')}`;

      return {
        label: formatTime,
        value: formatTime,
        disabled: item.available === false,
      };
    });
  }, [scheduleDayAvailable.data]);

  useEffect(() => {
    if (scheduleUpdate.isSuccess) {
      toast.success('Agendamento alterado com sucesso');
    }

    if (scheduleUpdate.isError) {
      toast.error((scheduleUpdate.error as Error).message);
    }
  }, [scheduleUpdate.error, scheduleUpdate.isError, scheduleUpdate.isSuccess]);

  useEffect(() => {
    if (scheduleDelete.isSuccess) {
      toast.success('Agendamento cancelado com sucesso');
    }

    if (scheduleDelete.isError) {
      toast.error((scheduleDelete.error as Error).message);
    }
  }, [scheduleDelete.error, scheduleDelete.isError, scheduleDelete.isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '400px',
          // height: '500px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#1e1e1e',
          borderColor: '#1e1e1e',
        },
      }}
    >
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <span>Cancele ou altere a data do seu agendamento:</span>
        </header>

        <span className={styles.scheduleEmployee}>
          <strong>Barbeiro:</strong> {schedule.fk_employee.fk_user.ds_user_name}
        </span>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor='date' className={styles.label}>
              Data do agendamento
            </label>
            <DatePicker
              id='date'
              name='date'
              className={styles.datePicker}
              onChange={setDate}
              selected={date}
              minDate={dayjs().toDate()}
            />
          </div>

          <InputSelect
            name='time'
            label='Horário'
            defaultValue=''
            onChange={(e) => setTime(e.target.value)}
            options={[
              { label: 'Selecione...', value: '', disabled: true },
              ...formattedTime,
            ]}
          />

          <div className={styles.buttonsContainer}>
            <Button color='blackAlpha' variant='ghost' onClick={onClose}>
              Voltar
            </Button>

            <Button
              color='delete'
              isLoading={scheduleDelete.isLoading}
              onClick={handleCancel}
            >
              Cancelar agendamento
            </Button>

            <Button
              type='submit'
              disabled={time === ''}
              isLoading={scheduleUpdate.isLoading}
            >
              Alterar data
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
