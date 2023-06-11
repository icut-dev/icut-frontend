import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiEdit, FiMinusCircle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserRole } from '~/appRoot/core/domain/models';
import { IUserCreate } from '~/appRoot/core/domain/usecases';
import {
  Button,
  Sidebar,
  Fieldset,
  InputRow,
  InputText,
} from '~/appRoot/presentation/components';
import { useUserCreate } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteUserCreate: IUserCreate;
}

interface EmployeeCreateForm {
  cpf: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phones: { number: string; description: string }[];
}

const schema = yup.object({
  username: yup.string().required('Por favor, informe seu nome de usuário'),
  firstName: yup.string().required('Por favor, informe seu nome'),
  lastName: yup.string().required('Por favor, informe seu último nome'),
  cpf: yup.string().required('Por favor, informe seu CPF'),
  email: yup.string().required('Por favor, informe seu e-mail'),
  password: yup.string().required('Por favor, informe sua senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  phones: yup.array().of(
    yup.object().shape({
      number: yup.string().required('Por favor, informe seu némero'),
      description: yup.string().required('Por favor, informe sua descrição'),
    }),
  ),
});

function AdminCreateEmployeePageComponent({ remoteUserCreate }: Props) {
  const router = useRouter();

  const userCreate = useUserCreate({ remoteCreateUser: remoteUserCreate });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EmployeeCreateForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      phones: [{ number: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = async (data: EmployeeCreateForm) => {
    await userCreate.mutateAsync({
      cpf: data.cpf,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      username: data.username,
      type_user: UserRole.EMPLOYEE,
      list_telephones: data.phones.map((phone) => ({
        telephone_number: phone.number,
        telephone_description: phone.description,
      })),
      // TODO: Adicionar id do estabelecimento do usuário que tiver logado
      id_establishment: '2',
    });
  };

  useEffect(() => {
    if (userCreate.isSuccess) {
      toast.success('Funcionário adicionado com sucesso!');
      router.push('/admin/employee');
    }

    if (userCreate.isError) {
      toast.error((userCreate.error as Error).message);
    }
  }, [router, userCreate.error, userCreate.isError, userCreate.isSuccess]);

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
          <h1>Adicionar funcionário</h1>
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

              <InputRow>
                <InputText
                  type='password'
                  error={errors.password}
                  label='Senha'
                  {...register('password')}
                />

                <InputText
                  type='password'
                  error={errors.confirmPassword}
                  label='Confirmar senha'
                  {...register('confirmPassword')}
                />
              </InputRow>
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
                    error={errors?.phones?.[index]?.number}
                    {...register(`phones.${index}.number`)}
                  />
                  <InputText
                    placeholder='Ex.: Celular principal'
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
                isLoading={userCreate.isLoading}
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
