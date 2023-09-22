const numberFormat = (value: number) => {
  const result = value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return result.slice(-2) === '00' ? result.slice(0, result.length - 3) : result;
};

export default numberFormat;
