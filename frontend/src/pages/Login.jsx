import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Anchor,
} from '@mantine/core';
import { useState } from 'react';
import useAuthStore from '../store/auth.js';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
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
    } catch (err) {
      setError('Неверные имя пользователя или пароль');
    }
  };

  return (
    <Container size="xs" mt={50} style={{ minHeight: '400px' }}>
      <Title order={2} align="center" mb="md" c="dark">Войти</Title>
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Имя пользователя"
          placeholder="username"
          {...form.getInputProps('username')}
          required
        />
        <PasswordInput
          label="Пароль"
          placeholder="password"
          mt="sm"
          {...form.getInputProps('password')}
          required
        />
        <Button type="submit" fullWidth mt="md">
          Войти
        </Button>
        <Anchor component={Link} to="/signup" mt="md" style={{ display: 'block', textAlign: 'center' }}>
          Нет аккаунта? Зарегистрироваться
        </Anchor>
      </Box>
    </Container>
  );
};

export default Login;
