const toCapitalString = (value: string) => {
  const result = value.charAt(0).toUpperCase() + value.slice(1);
  return result;
};

export default toCapitalString;
