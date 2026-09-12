import { Link, useNavigate } from 'react-router-dom';
import { Container, Group, Anchor, Button } from '@mantine/core';
import useAuthStore from '../store/auth.js';

const Header = () => {
  const token = useAuthStore((state) => state.token);
  const removeAuth = useAuthStore((state) => state.removeAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    navigate('/login');
  };

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
      <Container size="lg">
        <Group justify="space-between">
          <Anchor component={Link} to="/" fw={700} c="dark">Hexlet Chat</Anchor>
          {token && <Button variant="subtle" onClick={handleLogout}>Выйти</Button>}
        </Group>
      </Container>
    </div>
  );
};

export default Header;
