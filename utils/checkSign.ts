export function checkPriceSign(checker: (price: number, percentage: number) => number) {
  // @ts-ignore
  if (Number(checker) < 0 || Number(checker) === -0 || checker === 'N/A') {
    return 'text-red-500';
  }
  return 'text-emerald-600';
}

export function checkPercentSign(percentage: number) {
  if (percentage < 0 || percentage === undefined) return 'text-red-500';
  return 'text-emerald-600';
}
