export function checkPriceSign(
  checker: (price: number, percentage: number) => number
) {
  if (Number(checker) < 0 || Number(checker) === -0) {
    return 'text-red-500';
  }
  return 'text-emerald-600';
}

export function checkPercentSign(percentage: number) {
  if (percentage < 0) return 'text-red-500';
  return 'text-emerald-600';
}
