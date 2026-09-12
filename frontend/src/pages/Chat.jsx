import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchChannels } from '../api.js';
import socket from '../socket.js';
import useUIStore from '../store/ui.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import Modals from '../components/modals/index.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const currentChannelId = useUIStore((state) => state.currentChannelId);
  const setCurrentChannelId = useUIStore((state) => state.setCurrentChannelId);
  const queryClient = useQueryClient();

  const { data: channels, isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
  });

  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannelId) {
      setCurrentChannelId(channels[0].id);
    }
  }, [channels, currentChannelId, setCurrentChannelId]);

  useEffect(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      queryClient.setQueryData(['messages'], (old) => (
        old ? [...old, message] : [message]
      ));
    });

    socket.on('newChannel', () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    });

    socket.on('removeChannel', (payload) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      if (currentChannelId === payload.id) {
        setCurrentChannelId(channels?.[0]?.id || null);
      }
    });

    socket.on('renameChannel', () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.disconnect();
    };
  }, [queryClient, currentChannelId, channels, setCurrentChannelId]);

  if (isLoading) return <div>{t('chat.loading')}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Channels channels={channels} />
      {currentChannelId ? (
        <Messages channelId={currentChannelId} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {t('chat.selectChannel')}
        </div>
      )}
      <Modals />
    </div>
  );
};

export default Chat;
