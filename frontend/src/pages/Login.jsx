import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Container, Title, Box } from '@mantine/core';

const Login = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Container size="xs" mt={50}>
      <Title order={2} align="center" mb="md" c="dark">Войти</Title>
      <Box component="form" onSubmit={form.onSubmit((values) => console.log(values))}>
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
      </Box>
    </Container>
  );
};

export default Login;
