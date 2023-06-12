'use client';

import { useRouter } from 'next/navigation';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import {
  useMemo,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  createContext,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserRole } from '~/appRoot/core/domain/models';
import {
  Authentication,
  IAuthentication,
} from '~/appRoot/core/domain/usecases';
import { useLogin } from '../hooks';

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: Authentication.Model;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  authentication: IAuthentication;
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

let authChannel: BroadcastChannel;

export function AuthProvider({ children, authentication }: AuthProviderProps) {
  const router = useRouter();
  const login = useLogin({ remote: authentication });
  const [user, setUser] = useState<Authentication.Model>(
    {} as Authentication.Model,
  );
  const isAuthenticated = !!user;

  const signOut = useCallback(() => {
    destroyCookie({}, 'icut.token', { path: '' });
    destroyCookie({}, 'icut.refreshToken', { path: '' });
    destroyCookie({}, 'icut.user', { path: '' });

    authChannel.postMessage('signOut');

    router.push('/');
  }, [router]);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      await login.mutateAsync(
        {
          email,
          password,
        },
        {
          onSuccess(data) {
            if (!data) return;

            const { access_token, refresh_token } = data;

            setCookie(undefined, 'icut.token', access_token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });

            setCookie(undefined, 'icut.refreshToken', refresh_token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });

            setCookie(undefined, 'icut.user', JSON.stringify(data), {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });

            if (
              data.user_type === UserRole.ADMIN ||
              data.user_type === UserRole.EMPLOYEE
            ) {
              router.replace('/admin/appointment');
            } else {
              router.replace('/home');
            }

            setUser(data);

            authChannel.postMessage('signIn');
          },
        },
      );
    },
    [login, router],
  );

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    // eslint-disable-next-line prettier/prettier
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;

        case 'signIn':
          router.push('/home');
          break;

        default:
          break;
      }
    };
  }, [router, signOut]);

  useEffect(() => {
    if (login.isError) {
      toast.error((login.error as Error).message);
    }

    if (login.isSuccess) {
      toast.success('Login realizado com sucesso!');
    }
  }, [login.error, login.isError, login.isSuccess]);

  useEffect(() => {
    if (Object.keys(user).length > 0) return;

    const { 'icut.user': iCutUser } = parseCookies();

    setUser(JSON.parse(iCutUser || '{}'));
  }, [user]);

  const values = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
    }),
    [isAuthenticated, signIn, signOut, user],
  );

  return (
    <AuthContext.Provider value={values}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
}
