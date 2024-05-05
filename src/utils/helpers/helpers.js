export const extractErrors = (errors) => {
  if (errors) {
    const errorsArray = Object.keys(errors).reduce((acc, key) => {
      return acc.concat(errors[key]);
    }, []);
    return errorsArray;
  }
};
