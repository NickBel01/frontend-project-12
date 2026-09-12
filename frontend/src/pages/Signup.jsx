import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  TextInput, PasswordInput, Button, Container, Title, Box, Alert, Anchor,
} from '@mantine/core';
import { useState } from 'react';
import useAuthStore from '../store/auth.js';

const Signup = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => {
        if (!value) return 'Обязательное поле';
        if (value.length < 3 || value.length > 20) return 'От 3 до 20 символов';
        return null;
      },
      password: (value) => {
        if (!value) return 'Обязательное поле';
        if (value.length < 6) return 'Не менее 6 символов';
        return null;
      },
      confirmPassword: (value, values) => (
        value !== values.password ? 'Пароли должны совпадать' : null
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
        setError('Такой пользователь уже существует');
      } else {
        setError('Ошибка регистрации');
      }
    }
  };

  return (
    <Container size="xs" mt={50} style={{ minHeight: '400px' }}>
      <Title order={2} align="center" mb="md" c="dark">Регистрация</Title>
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Имя пользователя"
          placeholder="username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="password"
          mt="sm"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Подтверждение пароля"
          placeholder="password"
          mt="sm"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" fullWidth mt="md">
          Зарегистрироваться
        </Button>
      </Box>
      <Anchor component={Link} to="/login" mt="md" style={{ display: 'block', textAlign: 'center' }}>
        Уже есть аккаунт? Войти
      </Anchor>
    </Container>
  );
};

export default Signup;
