import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiEdit, FiMinusCircle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserRole } from '~/appRoot/core/domain/models';
import { IUserFindById, IUserUpdate } from '~/appRoot/core/domain/usecases';
import {
  Button,
  Sidebar,
  Fieldset,
  InputRow,
  InputText,
} from '~/appRoot/presentation/components';
import { useUserFindById, useUserUpdate } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  userId: number;
  remoteUserUpdate: IUserUpdate;
  remoteUserFindById: IUserFindById;
}

interface EmployeeUpdateForm {
  cpf: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phones: { number: string; description: string }[];
}

const schema = yup.object({
  username: yup.string().required('Por favor, informe seu nome de usuário'),
  firstName: yup.string().required('Por favor, informe seu nome'),
  lastName: yup.string().required('Por favor, informe seu último nome'),
  cpf: yup.string().required('Por favor, informe seu CPF'),
  email: yup.string().required('Por favor, informe seu e-mail'),
  phones: yup.array().of(
    yup.object().shape({
      number: yup.string().required('Por favor, informe seu némero'),
      description: yup.string().required('Por favor, informe sua descrição'),
    }),
  ),
});

function AdminCreateEmployeePageComponent({
  userId,
  remoteUserUpdate,
  remoteUserFindById,
}: Props) {
  const router = useRouter();

  const userUpdate = useUserUpdate({ remoteUserUpdate });
  const userFindById = useUserFindById({
    params: { id: userId },
    remoteUserFindById,
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = async (data: EmployeeUpdateForm) => {
    await userUpdate.mutateAsync({
      id: userId,
      cpf: data.cpf,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      type_user: UserRole.EMPLOYEE,
    });
  };

  useEffect(() => {
    if (userUpdate.isSuccess) {
      toast.success('Funcionário atualizado com sucesso!');
      router.push('/admin/employee');
    }

    if (userUpdate.isError) {
      toast.error((userUpdate.error as Error).message);
    }
  }, [router, userUpdate.error, userUpdate.isError, userUpdate.isSuccess]);

  useEffect(() => {
    if (!userFindById.data) return;

    setValue('cpf', userFindById.data.cpf);
    setValue('email', userFindById.data.email);
    setValue('username', userFindById.data.username);
    setValue('firstName', userFindById.data.first_name);
    setValue('lastName', userFindById.data.last_name);
    replace(
      userFindById.data.list_telephones.map((phone, index) => ({
        id: phone.id_telephone,
        number: phone.telephone_number,
        description: phone.telephone_description,
      })),
    );
  }, [append, replace, setValue, userFindById.data]);

  const legendElement = (
    <Button
      type='button'
      className={styles.addPhone}
      onClick={() => {
        append({
          number: '',
          description: '',
        });
      }}
    >
      <FiPlus size={16} />
      Adicionar telefone
    </Button>
  );

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Detalhes do funcionário</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Fieldset>
              <InputText
                error={errors.username}
                label='Nome de usuário'
                {...register('username')}
              />

              <InputRow>
                <InputText
                  error={errors.firstName}
                  label='Nome'
                  {...register('firstName')}
                />

                <InputText
                  error={errors.lastName}
                  label='Sobrenome'
                  {...register('lastName')}
                />
              </InputRow>

              <InputText
                error={errors.email}
                label='E-mail'
                type='email'
                {...register('email')}
              />

              <InputText
                placeholder='Ex.: 000.000.000-00'
                error={errors.cpf}
                label='CPF'
                {...register('cpf')}
              />
            </Fieldset>

            <Fieldset
              legendTitle='Telefones'
              legend={legendElement}
              className={styles.fieldset}
            >
              {fields.map((field, index) => (
                <InputRow key={field.id}>
                  <InputText
                    placeholder='Ex.: (11) 99999-9999'
                    // @ts-ignore
                    error={errors?.phones?.[index]?.number}
                    {...register(`phones.${index}.number`)}
                  />
                  <InputText
                    placeholder='Ex.: Celular principal'
                    // @ts-ignore
                    error={errors?.phones?.[index]?.description}
                    {...register(`phones.${index}.description`)}
                  />

                  {fields.length > 1 && (
                    <Button
                      type='button'
                      onClick={() => remove(index)}
                      className={styles.removePhone}
                    >
                      <FiMinusCircle size={16} />
                    </Button>
                  )}
                </InputRow>
              ))}
            </Fieldset>

            <div className={styles.buttonsContainer}>
              <Button
                type='button'
                className={styles.backButton}
                onClick={() => router.back()}
              >
                Voltar
              </Button>

              <Button
                type='submit'
                className={styles.editButton}
                isLoading={userUpdate.isLoading}
              >
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

export default AdminCreateEmployeePageComponent;
