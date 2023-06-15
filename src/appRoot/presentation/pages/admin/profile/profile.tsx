import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Ref, useContext, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiMinusCircle, FiPlus } from 'react-icons/fi';
import * as yup from 'yup';
import { UserRole } from '~/appRoot/core/domain/models';
import {
  IPhoneFindAllByUserId,
  IUserAvatar,
  IUserFindById,
  IUserUpdate,
} from '~/appRoot/core/domain/usecases';
import { Button, InputText, Fieldset } from '~/appRoot/presentation/components';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import {
  useUserUpdate,
  useUserFindById,
  useUserAvatar,
} from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface Props {
  remoteUserUpdate: IUserUpdate;
  remoteUserFindById: IUserFindById;
  remotePhoneFindAllByUserId: IPhoneFindAllByUserId;
  remoteUserAvatar: IUserAvatar;
}

interface UserForm {
  username: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phones: {
    id?: number;
    number: string;
    description: string;
  }[];
}

const schema = yup.object().shape({
  username: yup.string().required('Por favor, informe o nome de usuário'),
  firstName: yup.string().required('Por favor, informe o nome'),
  lastName: yup.string().required('Por favor, informe o sobrenome'),
  cpf: yup.string().required('Por favor, informe o CPF'),
  email: yup
    .string()
    .required('Por favor, informe o e-mail')
    .email('E-mail inválido'),
  phones: yup.array().of(
    yup.object().shape({
      number: yup.string().required('Por favor, informe o número do telefone'),
      description: yup
        .string()
        .required('Por favor, informe a descrição do telefone'),
    }),
  ),
});

function AdminProfilePageComponent({
  remoteUserUpdate,
  remoteUserFindById,
  remoteUserAvatar,
}: Props) {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const userUpdate = useUserUpdate({ remoteUserUpdate });
  const userFindById = useUserFindById({
    params: { id: user.id_user },
    remoteUserFindById,
  });
  const avatarUpload = useUserAvatar({ remoteUserAvatar });

  const fileInputRef: Ref<HTMLInputElement> = useRef(null);

  const userAvatar = userFindById.data?.avatar_image || '';
  const [image, setImage] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'phones',
  });

  const handleInputFileClick = () => {
    fileInputRef?.current.click();
  };

  const onSubmit = async (data: any) => {
    if (!user) return;

    await userUpdate.mutateAsync({
      id: user.id_user,
      cpf: data.cpf,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      type_user: UserRole.ADMIN,
    });
  };

  const onSubmitImage = async () => {
    if (!image) return;

    await avatarUpload.mutateAsync({
      file: image,
    });

    setImage(null);
  };

  const legendElement = (
    <button
      type='button'
      onClick={() => {
        append({
          number: '',
          description: '',
        });
      }}
      className={styles.addPhone}
    >
      <FiPlus size={16} />
      Adicionar telefone
    </button>
  );

  useEffect(() => {
    if (!userFindById.data) return;

    setValue(
      'cpf',
      userFindById.data.cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      ),
    );
    setValue('email', userFindById.data.email);
    setValue('username', userFindById.data.username);
    setValue('firstName', userFindById.data.first_name);
    setValue('lastName', userFindById.data.last_name);
    replace(
      userFindById.data.list_telephones.map((phone, index) => ({
        id: phone.id_telephone,
        number: phone.telephone_number.replace(
          /(\d{2})(\d{5})(\d{4})/,
          '($1) $2-$3',
        ),
        description: phone.telephone_description,
      })),
    );
  }, [append, replace, setValue, userFindById.data]);

  useEffect(() => {
    if (avatarUpload.isSuccess) {
      toast.success('Foto de perfil atualizada com sucesso!');
    }

    if (avatarUpload.isError) {
      toast.error((avatarUpload.error as Error).message);
    }
  }, [
    router,
    avatarUpload.error,
    avatarUpload.isError,
    avatarUpload.isSuccess,
  ]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Fieldset legendTitle='Dados pessoais'>
          <Image
            src={image ? URL.createObjectURL(image) : userAvatar}
            alt={user?.username}
            width={120}
            height={120}
            onClick={handleInputFileClick}
          />

          <input
            ref={fileInputRef}
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            hidden
            onChange={async (e) => {
              const { files } = e.target;

              if (files) {
                setImage(files[0]);
              }
            }}
          />
          {image && (
            <div className={styles.container_buttons}>
              <Button
                variant='solid'
                color='primary'
                onClick={onSubmitImage}
                isLoading={avatarUpload.isLoading}
              >
                Salvar
              </Button>

              <Button
                variant='ghost'
                color='primary'
                onClick={() => setImage(null)}
              >
                Cancelar
              </Button>
            </div>
          )}

          <InputText
            error={errors.username}
            label='Nome de usuário'
            {...register('username')}
          />

          <div className={styles.namesContainer}>
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
          </div>

          <InputText
            disabled
            error={errors.email}
            label='E-mail'
            {...register('email')}
          />

          <InputText
            disabled
            placeholder='Ex.: 000.000.000-00'
            error={errors.cpf}
            label='CPF'
            {...register('cpf')}
          />
        </Fieldset>

        <Fieldset legendTitle='Telefones' legend={legendElement}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.phonesContainer}>
              <InputText
                disabled
                placeholder='Ex.: (11) 99999-9999'
                error={errors?.phones?.[index]?.number}
                {...register(`phones.${index}.number`)}
              />
              <InputText
                disabled
                placeholder='Ex.: Celular principal'
                error={errors?.phones?.[index]?.description}
                {...register(`phones.${index}.description`)}
              />

              {fields.length > 1 && (
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className={styles.removePhone}
                >
                  <FiMinusCircle size={16} />
                </button>
              )}
            </div>
          ))}
        </Fieldset>

        <div className={styles.buttonsContainer}>
          <Button
            type='button'
            color='blackAlpha'
            className={styles.saveButton}
            onClick={() => router.back()}
          >
            Voltar
          </Button>

          <Button
            type='submit'
            className={styles.saveButton}
            isLoading={userUpdate.isLoading}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminProfilePageComponent;
