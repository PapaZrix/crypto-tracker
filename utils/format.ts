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
