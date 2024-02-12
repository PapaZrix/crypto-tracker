export function checkPriceSign(checker: (price: number, percentage: number) => number) {
  if (Number(checker) === 0) return 'text-gray-400 dark:text-gray-500';
  // @ts-ignore
  else if (Number(checker) < 0 || Number(checker) === -0 || checker === 'N/A') {
    return 'text-red-500';
  }
  return 'text-green-500';
}

export function checkPercentSign(percentage: number) {
  if (percentage < 0 || percentage === undefined) return 'text-red-500';
  else if (percentage === 0) return 'text-gray-400 dark:text-gray-500';
  return 'text-green-500';
}

export function getPriceChange(price: any, percentage: any): any {
  if (percentage === undefined) return 'N/A';
  if (percentage === 0) return 0;
  let priceChange = 0;
  if (percentage < 0) {
    priceChange = price * (percentage / 100);
    return formatValue(priceChange);
  } else {
    let previous = price / (1 + percentage / 100);
    return formatValue(price - previous);
  }
}

export function formatValue(value: number | undefined) {
  const minDecimalPlaces = 2;
  const maxDecimalPlaces = 8;

  if (value !== undefined) {
    const orderOfMagnitude = Math.floor(Math.log10(Math.abs(value)));

    let decimalPlaces = Math.max(
      minDecimalPlaces,
      Math.min(maxDecimalPlaces, -orderOfMagnitude + (value < 0 ? 1 : 0))
    );

    let formattedValue = value.toFixed(decimalPlaces);

    formattedValue = formattedValue.replace(/\.?0+$/, '');

    return formattedValue;
  }
}

export function formatPrice(value: number | undefined) {
  if (value !== undefined) {
    const minDecimalPlaces = 2;
    const maxDecimalPlaces = 4;

    const orderOfMagnitude = Math.floor(Math.log10(Math.abs(value)));

    let decimalPlaces = Math.max(minDecimalPlaces, maxDecimalPlaces - orderOfMagnitude);

    let formattedValue = value.toFixed(decimalPlaces);

    formattedValue = formattedValue.replace(/\.?0+$/, '');

    return formattedValue;
  }
}
