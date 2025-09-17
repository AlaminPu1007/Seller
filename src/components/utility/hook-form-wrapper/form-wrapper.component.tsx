'use client';

import {
  UseFormReturn,
  useForm,
  FormProvider,
  FieldValues,
  UseFormProps,
  DefaultValues
} from 'react-hook-form';
import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface HookFormStyleWrapperProps<T extends FieldValues> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => void;
  children: (props: { form: UseFormReturn<T> }) => ReactNode;
  formOptions?: Omit<UseFormProps<T>, 'resolver' | 'defaultValues'>;
}

export function HookFormWrapper<T extends FieldValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  formOptions
}: HookFormStyleWrapperProps<T>) {
  const form = useForm<T>({
    ...formOptions,
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues as DefaultValues<T>
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children({ form })}</form>
    </FormProvider>
  );
}
