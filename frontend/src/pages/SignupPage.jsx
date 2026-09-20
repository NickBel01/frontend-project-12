import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Center,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { signup } from '../api/auth.js';
import { useAuth } from '../store/auth.js';
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => validateUsername(value, t),
      password: (value) => validatePassword(value, t),
      confirmPassword: (value, values) => validateConfirmPassword(value, values, t),
    },
  });

  const mutation = useMutation({
    mutationFn: ({ username, password }) => signup({ username, password }),
    onSuccess: (data) => {
      setAuth(data.token, data.username);
      navigate('/');
    },
  });

  const errorMessage = mutation.isError
    ? (mutation.error?.response?.status === 409
      ? t('signup.error')
      : t('signup.errorGeneric'))
    : null;

  return (
    <Container size="xs" mt={50} mih={400}>
      <Title order={2} ta="center" mb="md" c="dark">{t('signup.title')}</Title>
      {errorMessage && <Alert color="red" mb="md">{errorMessage}</Alert>}
      <Box component="form" onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <TextInput
          label={t('signup.username')}
          placeholder={t('signup.usernamePlaceholder')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label={t('signup.password')}
          placeholder={t('signup.passwordPlaceholder')}
          mt="sm"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label={t('signup.confirmPassword')}
          placeholder={t('signup.confirmPasswordPlaceholder')}
          mt="sm"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" fullWidth mt="md" loading={mutation.isPending}>
          {t('signup.submit')}
        </Button>
      </Box>
      <Center mt="md">
        <Link to="/login">{t('signup.login')}</Link>
      </Center>
    </Container>
  );
};

export default SignupPage;
