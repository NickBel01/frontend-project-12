import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Anchor,
} from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/auth.js';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => {
        if (!value) return t('modals.validation.required');
        if (value.length < 3 || value.length > 20) return t('modals.validation.length');
        return null;
      },
      password: (value) => {
        if (!value) return t('modals.validation.required');
        if (value.length < 6) return t('modals.validation.minPassword');
        return null;
      },
      confirmPassword: (value, values) => (
        value !== values.password ? t('modals.validation.match') : null
      ),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });
      setAuth(response.data.token, response.data.username);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t('signup.error'));
      } else {
        setError(t('signup.errorGeneric'));
      }
    }
  };

  return (
    <Container size="xs" mt={50} style={{ minHeight: '400px' }}>
      <Title order={2} align="center" mb="md" c="dark">{t('signup.title')}</Title>
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('signup.username')}
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label={t('signup.password')}
          placeholder="password"
          mt="sm"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label={t('signup.confirmPassword')}
          placeholder="password"
          mt="sm"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" fullWidth mt="md">
          {t('signup.submit')}
        </Button>
      </Box>
      <Anchor component={Link} to="/login" mt="md" style={{ display: 'block', textAlign: 'center' }}>
        {t('signup.hasAccount')}
        {' '}
        {t('signup.login')}
      </Anchor>
    </Container>
  );
};

export default Signup;
