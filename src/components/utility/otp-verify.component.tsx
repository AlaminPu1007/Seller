'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const InitialTime = 60;

interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
  className?: string;
  title?: string;
  description?: string;
  onClickMethod: () => void;
  loading?: boolean;
  onResend: () => void;
}

export function OTPFormUiComponent({
  length = 6,
  title = 'Sign up as a Cartup Seller',
  description = 'A text message with a 6-digit verification code has been sent to 019******21',
  onChange,
  className,
  onClickMethod,
  loading = false,
  onResend
}: OtpInputProps) {
  const { t } = useTranslation('auth');

  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timeLeft, setTimeLeft] = useState(InitialTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isActive]);

  useEffect(() => {
    onChange(values.join(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleResend = () => {
    setIsActive(true);
    setTimeLeft(InitialTime);
    onResend();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (/^\d$/.test(val)) {
      const newValues = [...values];
      newValues[idx] = val;
      setValues(newValues);
      if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
    } else if (val === '') {
      const newValues = [...values];
      newValues[idx] = '';
      setValues(newValues);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === 'Enter') {
      onClickMethod && onClickMethod();
    } else if (e.key === 'Backspace' && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
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
        <div className='pt-[24px]'>
          <h3 className='text-text-primary m-0 mb-2 p-0 text-2xl font-bold'>
            {title}
          </h3>
          <p className='text-tertiary m-0 p-0 text-sm'>{description}</p>
        </div>
      </div>
      <div className='mt-5'>
        <h4 className='text-text-primary m-0 mb-2 p-0 text-2xl font-bold'>
          {t('enter_code')}
        </h4>
        <div
          className={`flex items-center justify-between gap-2 text-center ${className}`}
        >
          {Array.from({ length }).map((_, idx) => {
            return (
              <input
                autoFocus={idx === 0}
                key={idx}
                type='number'
                maxLength={1}
                value={values[idx]}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el!) as any}
                className={`${idx == 0 || values[idx - 1] ? 'bg-white' : 'bg-bg-tertiary'} [&-moz-appearance]:textfield h-12 w-12 appearance-none rounded-md border text-center focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none`}
              />
            );
          })}
        </div>
      </div>

      <Button
        disabled={values.some((i) => i === '') || loading}
        className='bg-brand-secondary mt-2 ml-auto h-[40px] w-full cursor-pointer rounded-sm text-base'
        type='submit'
        onClick={onClickMethod}
      >
        {loading ? t('loading_text') + '...' : t('submit')}
      </Button>
      <div className='mt-1 flex items-center'>
        <p className='text-text-primary m-0 p-0 text-base'>
          {t('did_not_received_code_text')}
        </p>{' '}
        <button
          onClick={handleResend}
          disabled={isActive}
          className={`text-brand-secondary ms-2 text-base transition-all duration-300 ${
            isActive
              ? 'cursor-not-allowed'
              : 'text-brand-secondary cursor-pointer'
          }`}
        >
          {' '}
          {isActive ? ` Resend(${timeLeft}s)` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
}
