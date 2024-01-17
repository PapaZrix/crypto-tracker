import { Currency } from '@/types';

type CustomTooltipProps = {
  active: boolean;
  payload: any;
  label: any;
  selectedCurrency: Currency;
};

export default function CustomTooltip({
  active,
  payload,
  label,
  selectedCurrency,
}: CustomTooltipProps) {
  if (active && payload) {
    return (
      <div className='rounded p-4 bg-gray-200 dark:bg-gray-800'>
        <div className='flex gap-6 text-gray-500'>
          <p>{label}</p>
          <p>{payload[0].payload.Time}</p>
        </div>
        <p>{`${selectedCurrency} ${payload[0].payload.Price}`}</p>
      </div>
    );
  }
}
