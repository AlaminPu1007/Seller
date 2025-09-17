'use client';

import { Metadata } from 'next';

import { SubmitHandler } from 'react-hook-form';
import { InitialValue, SignInData, SignInSchema } from '../signin/form.config';
import { HookFormWrapper } from '@/components/utility/hook-form-wrapper';
import { SignInUIComponent } from '../signin';

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
