/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { IEmployeeFindAllByEstablishment } from '~/appRoot/core/domain/usecases';
import { ScheduleContext } from '~/appRoot/presentation/contexts/schedule-context';
import { useEmployeeFindAllByEstablishment } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface EmployeesProps {
  remoteEmployeeFindAllByEstablishment: IEmployeeFindAllByEstablishment;
}

export function Employees({
  remoteEmployeeFindAllByEstablishment,
}: EmployeesProps) {
  const { setEmployee, employee, establishment } = useContext(ScheduleContext);

  const employeeFindAllByEstablishment = useEmployeeFindAllByEstablishment({
    params: { establishmentId: establishment?.id as number },
    remoteEmployeeFindAllByEstablishment,
  });

  return (
    <ul className={styles.employees}>
      {employeeFindAllByEstablishment.isLoading ? (
        <li>Carregando...</li>
      ) : (
        employeeFindAllByEstablishment.data?.map((e, index) => (
          <li
            key={e.id_employee}
            data-testid={`employee-${index}`}
            className={`${
              employee?.id_employee === e.id_employee
                ? styles.employee_selected
                : ''
            }`}
          >
            <button type='button' onClick={() => setEmployee(e)}>
              <div>
                <img
                  src='https://github.com/ThallesRodri.png'
                  alt={e.user.first_name}
                />
                <span>{e.user.first_name}</span>
              </div>

              {employee?.id_employee === e.id_employee && (
                <FiCheckCircle size={20} color='#48BB78' />
              )}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
