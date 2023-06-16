import dayjs from 'dayjs';
import { useCallback, useContext, useState } from 'react';
import {
  MdPix,
  BsCashCoin,
  BsCreditCard2Back,
  BsCreditCard2Front,
  CiLock,
} from 'react-icons/all';
import { formatCurrency } from '~/appRoot/infra/utils';
import { PaymentMethod } from '~/appRoot/presentation/pages/payment/components/payment-method';
import { Button, Header } from '../../components';
import { ScheduleContext } from '../../contexts/schedule-context';
import styles from './payment.module.scss';

function PaymentPageComponent() {
  const { date, service, employee, establishment, isScheduling, onSchedule } =
    useContext(ScheduleContext);

  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const handlePay = useCallback(() => {
    if (!paymentMethodId) return;

    onSchedule();
  }, [onSchedule, paymentMethodId]);

  if (!service || !employee || !establishment) return null;

  return (
    <div className={styles.container}>
      <Header title='Métodos de pagamento' />

      <p>Escolha o método que deseja utilizar.</p>

      <div className={styles.payment_methods_container}>
        {/* <PaymentMethod
          id='1'
          icon={MdPix}
          name='PIX'
          isSelected={paymentMethodId === '1'}
          setSelectPaymentMethod={setPaymentMethodId}
        /> */}

        <PaymentMethod
          id='1'
          icon={BsCashCoin}
          name='À combinar'
          isSelected={paymentMethodId === '1'}
          setSelectPaymentMethod={setPaymentMethodId}
        />

        {/* <PaymentMethod
          id='3'
          icon={BsCreditCard2Back}
          name='Crédito'
          isSelected={paymentMethodId === '3'}
          setSelectPaymentMethod={setPaymentMethodId}
        />

        <PaymentMethod
          id='4'
          icon={BsCreditCard2Front}
          name='Débito'
          isSelected={paymentMethodId === '4'}
          setSelectPaymentMethod={setPaymentMethodId}
        /> */}
      </div>

      <p className={styles.payment_secure}>
        <CiLock size={16} /> Todos os métodos de pagamento são seguro.
      </p>

      <footer className={styles.payment_footer}>
        <ul className={styles.payment_footer_details}>
          <li className={styles.payment_footer_detail}>
            <span>Serviço</span>
            <span className={styles.payment_footer_detail_description}>
              {service.description_service}
            </span>
          </li>

          <li className={styles.payment_footer_detail}>
            <span>Data</span>
            <span className={styles.payment_footer_detail_description}>
              {dayjs(date).format('DD [de] MMMM [de] YYYY')}
            </span>
          </li>

          <li className={styles.payment_footer_detail}>
            <span>Barbeiro</span>
            <span className={styles.payment_footer_detail_description}>
              {employee?.user.first_name}
            </span>
          </li>
        </ul>

        <Button
          type='button'
          className={styles.pay_button}
          isLoading={isScheduling}
          onClick={handlePay}
        >
          <span>Pagar agora</span>
          <span>{formatCurrency(service.valor)}</span>
        </Button>
      </footer>
    </div>
  );
}

export default PaymentPageComponent;
