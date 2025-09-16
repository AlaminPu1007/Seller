'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useForm, SubmitHandler, useFormContext } from 'react-hook-form';
import { InitialValue, SignInData, SignInSchema } from './form.config';
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
import Image from 'next/image';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import CountListData from '../../../data/country-lists-flag.json';

const COUNTRIES = [
  { code: '+880', name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png' }
];

export const FormUiComponent = () => {
  const { t } = useTranslation('auth');

  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext<SignInData>();

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [loading] = useTransition();
  const [formData, setFormData] = React.useState<{
    name: string;
    flag: string;
    code: string;
  }>({
    name: 'bangladesh',
    flag: 'https://flagcdn.com/w40/bd.png',
    code: '+88'
  });

  function handleChange(val: string) {
    const findItemFlag = CountListData.find(
      (item) => item.name.toLowerCase() === val.toLowerCase()
    );

    if (!findItemFlag) return;

    setFormData((prv) => ({
      ...prv,
      name: val,
      flag: findItemFlag?.flag || '',
      code: findItemFlag?.code || ''
    }));
  }

  const handlePasswordVisibleMethod = () => setIsVisiblePassword((prv) => !prv);

  return (
    <>
      <div className='w-full space-y-2 rounded-2xl border bg-white p-[24px] shadow-sm lg:max-w-[430px]'>
        <div className='flex flex-col items-center justify-center'>
          <div className='pt-[24px] text-center'>
            <Image
              alt='seller-logo'
              src={'/assets/images/auth/cart-up-seller-logo.svg'}
              height={60}
              width={170}
            />
          </div>
          <div className='py-[24px]'>
            <h3 className='text-text-primary m-0 p-0 text-2xl font-medium'>
              {t('sign_in_text')}
            </h3>
          </div>
        </div>
        <div>
          <FormField
            control={control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('mobile_no_text')} <span className='text-red-400'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='group border-disabled_subtle hover:border-primary focus:border-primary relative flex h-[48px] rounded-sm border transition-all duration-300'>
                    <Select.Root
                      value={formData.name}
                      onValueChange={handleChange}
                    >
                      <Select.Trigger
                        className='inline-flex items-center justify-between gap-2 rounded-lg py-2 pr-2 pl-2 text-sm font-medium focus:outline-none'
                        aria-label='Language select'
                      >
                        <Select.Value>
                          <div className='flex max-w-[120px] items-center gap-1'>
                            <div className='relative h-[20px] w-[25px] overflow-hidden'>
                              <Image
                                src={formData.flag}
                                alt='select-item-img'
                                fill
                                className='object-fill'
                              />
                            </div>
                            <p className='line-clamp-1 text-[#005F75] capitalize'>
                              {' '}
                              {formData.code}
                            </p>
                          </div>
                        </Select.Value>
                        <Select.Icon className='text-muted-foreground'>
                          <ChevronDown size={16} />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content className='z-50 w-auto overflow-hidden rounded-lg border bg-white shadow-lg'>
                          {COUNTRIES?.map((item) => {
                            return (
                              <Select.Viewport key={item.name} className='p-1'>
                                <Select.Item
                                  className='relative flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none select-none hover:bg-gray-100 aria-selected:bg-sky-500 aria-selected:text-white'
                                  value={item.name.toLowerCase()}
                                >
                                  <Select.SelectIcon>
                                    <Image
                                      src={item.flag}
                                      alt='select-item-img'
                                      width={30}
                                      height={30}
                                    />
                                  </Select.SelectIcon>
                                  <Select.ItemText>{item.code}</Select.ItemText>
                                </Select.Item>
                              </Select.Viewport>
                            );
                          })}
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>

                    {/* Phone Input */}
                    <Input
                      autoComplete='off'
                      type='tel'
                      placeholder='Enter Number'
                      disabled={loading}
                      className='hover:border-primary placeholder:text-quaternary h-full rounded-sm border-none px-0 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
                      {...field}
                    />
                  </div>
                </FormControl>
                {errors?.phoneNumber ? (
                  <FormMessage />
                ) : (
                  <div className='flex items-center gap-1'>
                    <svg
                      width={17}
                      height={17}
                      viewBox='0 0 17 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.5 6.55176V9.88509'
                        stroke='#8C8C8C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M8.50004 14.8251H4.46004C2.1467 14.8251 1.18004 13.1718 2.30004 11.1518L4.38004 7.40509L6.34004 3.88509C7.5267 1.74509 9.47337 1.74509 10.66 3.88509L12.62 7.41176L14.7 11.1584C15.82 13.1784 14.8467 14.8318 12.54 14.8318H8.50004V14.8251Z'
                        stroke='#8C8C8C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M8.49634 11.8851H8.50233'
                        stroke='#8C8C8C'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='text-tertiary m-0 p-0 text-sm font-medium'>
                      {t('hint_text')}
                    </p>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='mt-5'>
                <FormLabel>
                  {t('input_label_password')}
                  <span className='text-red-400'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='group border-disabled_subtle hover:border-primary focus:border-primary relative flex h-[48px] rounded-sm border transition-all duration-300'>
                    <div className='flex items-center justify-center ps-1 pr-2'>
                      <svg
                        width={25}
                        height={25}
                        viewBox='0 0 25 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M17.75 11.8018H7.25C6.42157 11.8018 5.75 12.4733 5.75 13.3018V18.5518C5.75 19.3802 6.42157 20.0518 7.25 20.0518H17.75C18.5784 20.0518 19.25 19.3802 19.25 18.5518V13.3018C19.25 12.4733 18.5784 11.8018 17.75 11.8018Z'
                          stroke='#717784'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M8.75 11.8018V8.80176C8.75 7.8072 9.14509 6.85337 9.84835 6.15011C10.5516 5.44685 11.5054 5.05176 12.5 5.05176C13.4946 5.05176 14.4484 5.44685 15.1517 6.15011C15.8549 6.85337 16.25 7.8072 16.25 8.80176V11.8018'
                          stroke='#717784'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <Input
                      type={isVisiblePassword ? 'text' : 'password'}
                      placeholder='Enter Password'
                      disabled={loading}
                      autoComplete='new-password'
                      className='hover:border-primary placeholder:text-quaternary h-full rounded-sm border-none px-0 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
                      {...field}
                    />
                    <button
                      className='flex cursor-pointer items-center justify-center px-2'
                      onClick={handlePasswordVisibleMethod}
                    >
                      {isVisiblePassword ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='icon text-tertiary icon-tabler icons-tabler-outline icon-tabler-eye'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                          <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                        </svg>
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='icon icon-tabler text-tertiary icons-tabler-outline icon-tabler-eye-off'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                          <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                          <path d='M3 3l18 18' />
                        </svg>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-between pt-[16px]'>
            <Link
              className='text-warning after:bg-warning relative text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:after:w-full'
              href={'#'}
            >
              {t('forget_password_text')}
            </Link>
            <Link
              className='text-brand-primary after:bg-brand-primary hover:after:bg-primary relative text-sm font-medium transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:transition-all after:duration-300 hover:after:w-0'
              href={'#'}
            >
              {t('create_new_account_text')}
            </Link>
          </div>

          <Button
            disabled={loading}
            className='mt-5 ml-auto h-[40px] w-full cursor-pointer rounded-sm text-base'
            type='submit'
            onClick={() => setTimeout(() => setValue('isSubmit', true), 50)}
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
        </div>
      </div>
    </>
  );
};
