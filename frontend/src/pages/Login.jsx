import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Anchor,
} from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
      const response = await axios.post('/api/v1/login', values);
      setAuth(response.data.token, response.data.username);
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
          required
        />
        <PasswordInput
          label={t('login.password')}
          placeholder="password"
          mt="sm"
          {...form.getInputProps('password')}
          required
        />
        <Button type="submit" fullWidth mt="md">
          {t('login.submit')}
        </Button>
        <Anchor component={Link} to="/signup" mt="md" style={{ display: 'block', textAlign: 'center' }}>
          {t('login.noAccount')}
          {' '}
          {t('login.signup')}
        </Anchor>
      </Box>
    </Container>
  );
};

export default Login;
