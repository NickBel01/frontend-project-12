import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Container, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import useAuthStore from './store/auth.js';

const Home = () => (
  <Container size="xs" mt={50}>
    <Title order={2} align="center" c="dark">Hexlet Chat</Title>
  </Container>
);

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
);

export default App;
