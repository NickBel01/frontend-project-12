import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchChannels } from '../api.js';
import socket from '../socket.js';
import useUIStore from '../store/ui.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';

const Chat = () => {
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

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [queryClient]);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Channels channels={channels} />
      {currentChannelId ? (
        <Messages channelId={currentChannelId} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Выберите канал
        </div>
      )}
    </div>
  );
};

export default Chat;
