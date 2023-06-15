import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import * as yup from 'yup';
import {
  IEstablishmentFindById,
  IEstablishmentUpdate,
} from '~/appRoot/core/domain/usecases';
import { Sidebar, Button, InputText } from '~/appRoot/presentation/components';
import {
  useEstablishmentUpdate,
  useEstablishmentFindById,
} from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteEstablishmentUpdate: IEstablishmentUpdate;
  remoteEstablishmentFindById: IEstablishmentFindById;
}

interface EstablishmentUpdateForm {
  cnpj: string;
  logo: string;
  email: string;
  corporateName: string;
  representativeName: string;
}

const schema = yup.object().shape({
  corporateName: yup.string().required('Por favor, informe a razão social'),
  representativeName: yup
    .string()
    .required('Por favor, informe o nome do responsável legal'),
  cnpj: yup.string().required('Por favor, informe o CNPJ'),
  email: yup
    .string()
    .required('Por favor, informe o e-mail')
    .email('E-mail inválido'),
});

function AdminEmployeePageComponent({
  remoteEstablishmentUpdate,
  remoteEstablishmentFindById,
}: Props) {
  const user = { id: 3, establishmentId: 2 };

  const establishmentUpdate = useEstablishmentUpdate({
    remoteEstablishmentUpdate,
  });

  const establishmentFindById = useEstablishmentFindById({
    params: { id: user.establishmentId },
    remoteEstablishmentFindById,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<EstablishmentUpdateForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: EstablishmentUpdateForm) => {
    await establishmentUpdate.mutateAsync({
      id: user.establishmentId,
      id_adm: user.id,
      cnpj: data.cnpj,
      logo: data.logo,
      email_establishment: data.email,
      corporate_name: data.corporateName,
      representative_name: data.representativeName,
    });
  };

  useEffect(() => {
    if (!establishmentFindById.data) return;

    setValue('corporateName', establishmentFindById.data.corporate_name);
    setValue(
      'representativeName',
      establishmentFindById.data.representative_name,
    );
    setValue(
      'cnpj',
      establishmentFindById.data.cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      ),
    );
    setValue('email', establishmentFindById.data.email_establishment);
    setValue('logo', establishmentFindById.data.logo);
  }, [establishmentFindById.data, setValue]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Configuração do estabelecimento</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputsContainer}>
              <InputText
                label='Razão social'
                error={errors.corporateName}
                {...register('corporateName')}
              />

              <InputText
                label='Responsável legal'
                error={errors.representativeName}
                {...register('representativeName')}
              />

              <InputText
                disabled
                label='CNPJ'
                placeholder='Ex.: 00.000.000/0000-00'
                error={errors.cnpj}
                {...register('cnpj')}
              />

              <InputText
                disabled
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />

              <InputText
                label='Logo url'
                error={errors.logo}
                {...register('logo')}
              />
            </div>

            <div className={styles.buttonsContainer}>
              <Button type='submit'>
                <FiEdit />
                Salvar
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminEmployeePageComponent;
