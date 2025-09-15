'use client';

import React, { useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInData, SignInSchema } from './form.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const FormUiComponent = () => {
  const { t } = useTranslation('auth');

  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '123456'
    }
  });

  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors, isSubmitting }
  //   } = form;

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data, 'data');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, startTransition] = useTransition();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('input_label_email')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Enter your email...'
                  disabled={loading}
                  className='h-[42px] rounded-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='mt-5'>
              <FormLabel>{t('input_label_password')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password...'
                  disabled={loading}
                  className='h-[42px] rounded-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className='mt-5 ml-auto h-[40px] w-full cursor-pointer rounded-sm text-base'
          type='submit'
        >
          {t('login_btn_text')}
        </Button>

        <div>
          <p className='text-center'>
            {t('have_not_account_text') + '? '}
            <Link className='text-blue-900 underline' href={'/auth/sign-up'}>
              {t('sign_up_btn_text')}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
