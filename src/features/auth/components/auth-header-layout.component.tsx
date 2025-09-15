'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { CountryFlagLists } from './auth-header-component';
import { useTranslation } from 'react-i18next';

export const AuthHeaderComponent = () => {
  const { t } = useTranslation('auth');

  return (
    <div className='bg-white'>
      <div className='container'>
        <div className='!h-[90px] items-center justify-between md:flex'>
          <div>
            <Image
              src={'/assets/images/app-logo/app-logo.svg'}
              alt='cart-up-logo'
              width={150}
              height={50}
            />
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div>
                <Button className='group cursor-pointer rounded-2xl border border-[#00ACD4] bg-white text-[#00ACD4] hover:bg-[#00ACD4] hover:text-white'>
                  <svg
                    width={21}
                    height={20}
                    viewBox='0 0 21 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='text-[#00ACD4] transition-colors duration-200 group-hover:text-white'
                  >
                    <path
                      d='M15.75 9.25H5.25C4.42157 9.25 3.75 9.92157 3.75 10.75V16C3.75 16.8284 4.42157 17.5 5.25 17.5H15.75C16.5784 17.5 17.25 16.8284 17.25 16V10.75C17.25 9.92157 16.5784 9.25 15.75 9.25Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M6.75 9.25V6.25C6.75 5.25544 7.14509 4.30161 7.84835 3.59835C8.55161 2.89509 9.50544 2.5 10.5 2.5C11.4946 2.5 12.4484 2.89509 13.1517 3.59835C13.8549 4.30161 14.25 5.25544 14.25 6.25V9.25'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {t('login_btn_text')}
                </Button>
              </div>

              <div>
                <Button className='group cursor-pointer rounded-2xl border border-[#00ACD4] bg-[#00ACD4] text-white hover:text-white'>
                  {t('sign_up_btn_text')}
                </Button>
              </div>
            </div>
            <div>
              <CountryFlagLists />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
