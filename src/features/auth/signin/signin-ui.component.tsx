'use client';

import Link from 'next/link';
import { FormUiComponent } from '../signin';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
import { OTPFormUiComponent } from '@/components/utility';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SignInData } from './form.config';
import { maskMobileNumber } from '@/lib/utils/maskMobileNumber';

export const SignInUIComponent = () => {
  const router = useRouter();

  const { t } = useTranslation('auth');
  const [otp, setOtp] = useState<string>('');

  const { watch, getValues } = useFormContext<SignInData>();

  const handleVerify = () => {
    // eslint-disable-next-line no-console
    console.log('OTP entered:', otp);
    router.push('/dashboard/overview');
  };

  return (
    <section>
      <div className='bg-section-gradient'>
        <div className='container'>
          <div className='grid grid-cols-1 py-[38px] lg:h-[calc(100vh-calc(var(--header-height)*2)+10px)] lg:grid-cols-2'>
            <div className='flex h-full items-center'>
              <div className='w-full lg:max-w-[500px]'>
                <h1 className='m-0 p-0 text-center text-4xl font-bold lg:text-start lg:text-7xl'>
                  {' '}
                  {t('create_account_title')}{' '}
                </h1>
                <div className='relative mt-[40px] mb-10 lg:mb-0'>
                  <div className='flex items-center justify-center gap-5 lg:justify-start'>
                    <Link
                      href={'#'}
                      className='hover:bg-primary group border-brand-secondary bg-brand-secondary shrink-0 cursor-pointer rounded-2xl border px-8 py-1 text-white transition-all duration-200 hover:text-white'
                    >
                      {t('sign_up_btn_text')}
                    </Link>
                    <div className='relative'>
                      <p className='text-tertiary m-0 max-w-[260px] p-0 text-base leading-5'>
                        {t('sign_in_slogan_text')}
                      </p>
                      <div className='absolute top-[-20px] right-5'>
                        <Image
                          alt='arrow-icon'
                          src={'/assets/images/auth/arrow-icon.svg'}
                          height={20}
                          width={50}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex h-full items-center justify-center lg:justify-end'>
              {watch('isSubmit') ? (
                <OTPFormUiComponent
                  length={6}
                  onChange={setOtp}
                  title={t('otp_title_text')}
                  description={
                    t('otp_description_text') +
                    ' ' +
                    (getValues().phoneNumber?.length
                      ? maskMobileNumber(getValues().phoneNumber)
                      : '')
                  }
                  onClickMethod={handleVerify}
                  loading={false}
                  onResend={() => null}
                />
              ) : (
                <FormUiComponent />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='py-2 lg:pt-6 lg:pb-2'>
          <p className='text-quaternary m-0 p-0 text-center text-xl md:text-2xl'>
            {t('sign_in_footer_slogan_text')}
          </p>
        </div>
      </div>
    </section>
  );
};
