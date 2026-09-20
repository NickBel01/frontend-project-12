import { Container, Title, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container size="xs" mt={50}>
      <Title order={2} ta="center" c="dark">{t('notFound.title')}</Title>
      <Text ta="center" c="gray">{t('notFound.text')}</Text>
    </Container>
  );
};

export default NotFoundPage;
