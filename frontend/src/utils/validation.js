export const validateRequired = (value, t) => (
  !value ? t('validation.required') : null
);

export const validateChannelName = (value, t) => {
  if (!value) return t('validation.required');
  if (value.length < 3 || value.length > 20) return t('validation.length');
  return null;
};

export const validateUsername = (value, t) => {
  if (!value) return t('validation.required');
  if (value.length < 3 || value.length > 20) return t('validation.usernameLength');
  return null;
};

export const validatePassword = (value, t) => {
  if (!value) return t('validation.required');
  if (value.length < 6) return t('validation.minPassword');
  return null;
};

export const validateConfirmPassword = (value, values, t) => (
  value !== values.password ? t('validation.match') : null
);
