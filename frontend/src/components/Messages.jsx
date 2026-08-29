import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../api.js';

const Messages = ({ channelId }) => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => fetchMessages(channelId),
  });

  if (isLoading) return <div>Загрузка сообщений...</div>;

  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
      <h3>Сообщения</h3>
      {messageList.map((message) => (
        <div key={message.id} style={{ marginBottom: 10 }}>
          <strong>{message.username}:</strong> {message.body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
