'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { FormUiComponent } from '../signin';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
import { OTPFormUiComponent } from '@/components/utility';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { InitialValue, SignInData, SignInSchema } from '../signin/form.config';
import { useRouter } from 'next/navigation';
import { HookFormWrapper } from '@/components/utility/hook-form-wrapper';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  // const { setValue } = useForm<SignInData>();

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    // setValue('isSubmit', true);
    // eslint-disable-next-line no-console
    console.log(data, 'data');
  };

  return (
    <>
      <HookFormWrapper
        initialValues={InitialValue}
        validationSchema={SignInSchema}
        onSubmit={onSubmit}
      >
        {() => <SignInUIComponent />}
      </HookFormWrapper>
    </>
  );
}

export const SignInUIComponent = () => {
  const router = useRouter();

  const { t } = useTranslation('auth');
  const [otp, setOtp] = useState<string>('');

  const { watch } = useFormContext<SignInData>();

  const handleVerify = () => {
    // eslint-disable-next-line no-console
    console.log('OTP entered:', otp);
    router.push('/dashboard/overview');
  };

  return (
    <section>
      <div className='bg-section-gradient'>
        <div className='container'>
          <div className='grid h-[calc(100vh-calc(var(--header-height)*2)+10px)] grid-cols-1 py-[38px] md:grid-cols-2'>
            <div className='flex h-full items-center'>
              <div className='max-w-[500px]'>
                <h1 className='m-0 p-0 text-4xl font-bold lg:text-7xl'>
                  {' '}
                  {t('create_account_title')}{' '}
                </h1>
                <div className='relative mt-[40px]'>
                  <div className='flex items-center gap-5'>
                    <Link
                      href={'#'}
                      className='hover:bg-primary group border-brand-secondary bg-brand-secondary cursor-pointer rounded-2xl border px-8 py-1 text-white transition-all duration-200 hover:text-white'
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
                  description={t('otp_description_text') + ' 019*****9'}
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
        <div className='pt-6 pb-2'>
          <p className='text-quaternary m-0 p-0 text-center text-2xl'>
            {t('sign_in_footer_slogan_text')}
          </p>
        </div>
      </div>
    </section>
  );
};
