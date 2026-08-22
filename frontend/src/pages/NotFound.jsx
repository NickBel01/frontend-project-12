import { Container, Title, Text } from '@mantine/core';

const NotFound = () => (
  <Container size="xs" mt={50}>
    <Title order={2} align="center" c="dark">404</Title>
    <Text align="center" c="gray">Страница не найдена</Text>
  </Container>
);

export default NotFound;
