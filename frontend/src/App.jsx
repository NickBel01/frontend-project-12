import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider, Container, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

const Home = () => (
  <Container size="xs" mt={50}>
    <Title order={2} align="center" c="dark">Hexlet Chat</Title>
  </Container>
);

const App = () => (
  <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
);

export default App;
