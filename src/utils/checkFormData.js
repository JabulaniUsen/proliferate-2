export const checkFormData = (form) => {
  const isAnyFieldEmpty = Object.values(form).some(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );
  return isAnyFieldEmpty;
};
