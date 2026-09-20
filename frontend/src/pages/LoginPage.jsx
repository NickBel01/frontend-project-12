import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Center,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth.js';
import { useAuth } from '../store/auth.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.token, data.username);
      navigate('/');
    },
  });

  return (
    <Container size="xs" mt={50} mih={400}>
      <Title order={2} ta="center" mb="md" c="dark">{t('login.title')}</Title>
      {mutation.isError && (
        <Alert color="red" mb="md">{t('login.error')}</Alert>
      )}
      <Box component="form" onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <TextInput
          label={t('login.username')}
          placeholder={t('login.usernamePlaceholder')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
          mt="sm"
          {...form.getInputProps('password')}
        />
        <Button type="submit" fullWidth mt="md" loading={mutation.isPending}>
          {t('login.submit')}
        </Button>
        <Center mt="md">
          <Link to="/signup">{t('login.signup')}</Link>
        </Center>
      </Box>
    </Container>
  );
};

export default LoginPage;
