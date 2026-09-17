import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert,
} from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth.js';
import { useAuth } from '../store/auth.js';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      setAuth(response.token, response.username);
      navigate('/');
    } catch {
      setError(t('login.error'));
    }
  };

  return (
    <Container size="xs" mt={50} style={{ minHeight: '400px' }}>
      <Title order={2} align="center" mb="md" c="dark">{t('login.title')}</Title>
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('login.username')}
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label={t('login.password')}
          placeholder="password"
          mt="sm"
          {...form.getInputProps('password')}
        />
        <Button type="submit" fullWidth mt="md">
          {t('login.submit')}
        </Button>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/signup">{t('login.signup')}</Link>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
