'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { currencies as availableCurrencies } from '@/constants';
import { Currency } from '@/types';
import { useState } from 'react';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';

type DropdownProps = {
  selectedCurrency: Currency;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};

type AvailableCurrencies = [Currency] | Currency[] | [];

export default function Dropdown({
  selectedCurrency,
  handleClick,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const currencies: AvailableCurrencies =
    query.length === 0
      ? availableCurrencies
      : availableCurrencies.filter((curr) =>
          curr.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOnClickOutside(handleClickOutside);

  return (
    <div ref={ref} className='relative'>
      <button
        className='flex justify-between items-center w-48 rounded-md border border-gray-400 dark:border-gray-600 shadow-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm dark:text-white outline-none hover:border-orange-500'
        type='submit'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCurrency.name?.toUpperCase()} - {selectedCurrency.symbol}
        <span>{isOpen ? <BiCaretUp /> : <BiCaretDown />}</span>
      </button>
      {isOpen && (
        <div className='absolute p-2 z-10 border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 border mt-2 w-full h-auto rounded-md '>
          <input
            value={query}
            className='w-full px-2 py-1 rounded border focus:outline-none focus:ring-0 focus:border-orange-500 bg-gray-50 dark:bg-gray-900'
            autoFocus
            placeholder='Search'
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className='uppercase text-sm scrollbar-none overflow-y-scroll max-h-52'>
            {currencies.map((currency) =>
              currency.name?.toLowerCase() ==
              selectedCurrency.name?.toLowerCase() ? (
                <li
                  onClick={handleClick}
                  className='my-1 p-1 text-orange-500 cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700'
                  key={currency.name}
                >
                  {currency.name} - {currency.symbol}
                </li>
              ) : (
                <li
                  onClick={handleClick}
                  className='my-1 p-1 cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700'
                  key={currency.name}
                >
                  {currency.name} - {currency.symbol}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
