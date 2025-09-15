'use client';

import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import CountListData from '../../../../data/country-lists-flag.json';
import Image from 'next/image';

export const CountryFlagLists = () => {
  const [value, setValue] = React.useState<{ name: string; flag: string }>({
    name: 'bangladesh',
    flag: 'https://flagcdn.com/w40/bd.png'
  });

  function handleChange(val: string) {
    const findItemFlag = CountListData.find(
      (item) => item.name.toLowerCase() === val.toLowerCase()
    );

    if (!findItemFlag) return;

    setValue({ name: val, flag: findItemFlag?.flag || '' });
  }

  return (
    <div className='flex items-center gap-0'>
      <div>
        <Select.Root value={value.name} onValueChange={handleChange}>
          <Select.Trigger
            className='inline-flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none'
            aria-label='Language select'
          >
            <Select.Value>
              <div className='flex max-w-[120px] items-center gap-1'>
                <div className='relative h-[35px] w-[35px] overflow-hidden rounded-full'>
                  <Image
                    src={value.flag}
                    alt='select-item-img'
                    fill
                    className='object-cover'
                  />
                </div>
                <p className='line-clamp-1 text-[#005F75] capitalize'>
                  {' '}
                  {value.name}
                </p>
              </div>
            </Select.Value>
            <Select.Icon className='text-muted-foreground'>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className='z-50 w-[200px] overflow-hidden rounded-lg border bg-white shadow-lg'>
              {CountListData?.map((item) => {
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
                      <Select.ItemText>{item.name}</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                );
              })}
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className='h-[20px] w-[0.5px] bg-gray-300' />
      <div>
        <Select.Root value={'english'}>
          <Select.Trigger
            className='inline-flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none'
            aria-label='Language select'
          >
            <Select.Value>
              <p className='text-[#005F75] capitalize'>{'English'}</p>
            </Select.Value>
            <Select.Icon className='text-muted-foreground'>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className='z-50 w-[160px] overflow-hidden rounded-lg border bg-white shadow-lg'>
              <Select.Viewport className='p-1'>
                <Select.Item
                  className='relative flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none select-none hover:bg-gray-100 aria-selected:bg-sky-500 aria-selected:text-white'
                  value={'english'}
                >
                  <Select.ItemText>English</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};
