import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Group, Anchor, Button, Box, Divider,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/auth.js';

const Header = () => {
  const { t } = useTranslation();
  const token = useAuth((state) => state.token);
  const removeAuth = useAuth((state) => state.removeAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    navigate('/login');
  };

  return (
    <>
      <Box py="sm">
        <Container size="lg">
          <Group justify="space-between">
            <Anchor component={Link} to="/" fw={700} c="dark">{t('header.brand')}</Anchor>
            {token && (
              <Button variant="subtle" onClick={handleLogout}>
                {t('header.logout')}
              </Button>
            )}
          </Group>
        </Container>
      </Box>
      <Divider />
    </>
  );
};

export default Header;
