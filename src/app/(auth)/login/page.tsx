'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from 'shared/constants';
import { useTranslation } from 'shared/i18n/hooks';
import { useAuth } from 'shared/lib';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputPassword,
  LanguageSwitcher,
} from 'shared/ui';

import { useLogin } from '../../../entities/auth';

const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('validation.email')),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, t('validation.passwordLength')),
  });

const LoginPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const router = useRouter();
  const { login } = useAuth();

  const loginSchema = useMemo(() => getLoginSchema(t), [t]);

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: response => {
          login(response.data.token, response.data.user);
          toast.success(t('auth.login.loginSuccess') || 'Login successful!');
          router.push('/');
        },
        onError: () => {
          toast.error(
            t('auth.login.loginError') || 'Login failed. Please try again.',
          );
        },
      },
    );
  };

  return (
    <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
      <CardHeader className="relative space-y-1 text-center">
        <div className="absolute right-0 top-0">
          <LanguageSwitcher />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {t('auth.login.title')}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {t('auth.login.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.login.email')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={t('auth.login.emailPlaceholder')}
                        className="pl-10"
                        type="email"
                        disabled={loginMutation.isPending}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.login.password')}</FormLabel>
                  <FormControl>
                    <InputPassword
                      isVisible={showPassword}
                      setIsVisible={setShowPassword}
                      placeholder={t('auth.login.passwordPlaceholder')}
                      className="pl-10 pr-10"
                      type={showPassword ? 'text' : 'password'}
                      disabled={loginMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending
                ? t('auth.login.signingIn')
                : t('auth.login.signIn')}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t('auth.login.noAccount')}{' '}
          </span>
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('auth.login.signUp')}
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              {t('auth.login.orContinueWith')}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          disabled={loginMutation.isPending}
          className="w-full"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {t('auth.login.google')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
