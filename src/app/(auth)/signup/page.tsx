'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from 'shared/constants';
import { useTranslation } from 'shared/i18n/hooks';
import { useAuth } from 'shared/lib';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
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

import { useRegister } from '../../../entities/auth';

const getSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(MIN_NAME_LENGTH, t('validation.nameLength')),
      email: z.string().email(t('validation.email')),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH, t('validation.passwordMinLength'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          t('validation.passwordComplexity'),
        ),
      confirmPassword: z.string(),
      acceptTerms: z
        .boolean()
        .refine(val => val === true, t('validation.acceptTermsRequired')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('validation.passwordsMatch'),
      path: ['confirmPassword'],
    });

const SignupPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();
  const router = useRouter();
  const { login } = useAuth();

  const signupSchema = useMemo(() => getSignupSchema(t), [t]);

  type SignupFormData = z.infer<typeof signupSchema>;

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: SignupFormData) => {
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: response => {
          login(response.data.token, response.data.user);
          toast.success(
            t('auth.signup.registrationSuccess') ||
              'Account created successfully!',
          );
          router.push('/');
        },
        onError: () => {
          toast.error(
            t('auth.signup.registrationError') ||
              'Registration failed. Please try again.',
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
          {t('auth.signup.title')}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {t('auth.signup.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.signup.fullName')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={t('auth.signup.fullNamePlaceholder')}
                        className="pl-10"
                        disabled={registerMutation.isPending}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.signup.email')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={t('auth.signup.emailPlaceholder')}
                        className="pl-10"
                        type="email"
                        disabled={registerMutation.isPending}
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
                  <FormLabel>{t('auth.signup.password')}</FormLabel>
                  <FormControl>
                    <InputPassword
                      isVisible={showPassword}
                      setIsVisible={setShowPassword}
                      placeholder={t('auth.signup.passwordPlaceholder')}
                      className="pl-10 pr-10"
                      type={showPassword ? 'text' : 'password'}
                      disabled={registerMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.signup.confirmPassword')}</FormLabel>
                  <FormControl>
                    <InputPassword
                      isVisible={showPassword}
                      setIsVisible={setShowPassword}
                      placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                      className="pl-10 pr-10"
                      type={showPassword ? 'text' : 'password'}
                      disabled={registerMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      {t('auth.signup.acceptTerms')}{' '}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        {t('auth.signup.termsOfService')}
                      </Link>{' '}
                      {t('auth.signup.and')}{' '}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        {t('auth.signup.privacyPolicy')}
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? t('auth.signup.creatingAccount')
                : t('auth.signup.createAccount')}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t('auth.signup.alreadyHaveAccount')}{' '}
          </span>
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('auth.signup.signIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
