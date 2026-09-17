import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { I18nextProvider } from 'react-i18next';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import i18n from '../i18n.js';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import NotFound from '../pages/NotFound.jsx';
import Chat from '../pages/Chat.jsx';
import Header from '../components/Header.jsx';
import { useAuth } from '../store/auth.js';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const token = useAuth((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <MantineProvider>
    <Notifications />
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  </MantineProvider>
);

export default App;
