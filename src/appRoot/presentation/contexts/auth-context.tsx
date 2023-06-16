'use client';

import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
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
  loading: boolean;
  setUser: Dispatch<SetStateAction<Authentication.Model>>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Authentication.Model>(
    {} as Authentication.Model,
  );
  const isAuthenticated = !!user;

  const signOut = useCallback(() => {
    destroyCookie({}, 'icut.token', { path: '/' });
    destroyCookie({}, 'icut.refreshToken', { path: '/' });
    destroyCookie({}, 'icut.user', { path: '/' });
    router.push('/');
    setUser({} as Authentication.Model);
  }, [router]);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setLoading(true);
      await login.mutateAsync(
        {
          email,
          password,
        },
        {
          onSuccess(data) {
            if (!data) return;

            const { access_token, refresh_token, expires_in } = data;

            setCookie(undefined, 'icut.token', access_token, {
              maxAge: expires_in,
              path: '/',
            });

            setCookie(undefined, 'icut.refreshToken', refresh_token, {
              maxAge: expires_in,
              path: '/',
            });

            setCookie(undefined, 'icut.user', JSON.stringify(data), {
              maxAge: expires_in,
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
          },
        },
      );

      setLoading(false);
    },
    [login, router],
  );

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

    if (!iCutUser) return;

    setUser(JSON.parse(iCutUser || '{}'));
  }, [user]);

  const values = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
      loading,
      setUser,
    }),
    [isAuthenticated, signIn, signOut, user, loading, setUser],
  );

  return (
    <AuthContext.Provider value={values}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
}
