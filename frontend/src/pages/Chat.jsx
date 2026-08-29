import { useQuery } from '@tanstack/react-query';
import { fetchChannels } from '../api.js';
import useUIStore from '../store/ui.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';

const Chat = () => {
  const currentChannelId = useUIStore((state) => state.currentChannelId);
  const { data: channels, isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
  });

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
