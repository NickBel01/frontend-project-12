import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../api.js';

const Messages = ({ channelId }) => {
  const [text, setText] = useState('');

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => fetchMessages(channelId),
  });

  if (isLoading) return <div>Загрузка сообщений...</div>;

  const messageList = Array.isArray(messages) ? messages : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // отправка будет на следующем шаге через WebSocket
    setText('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <h3>Сообщения</h3>
        {messageList.map((message) => (
          <div key={message.id} style={{ marginBottom: 10 }}>
            <strong>{message.username}:</strong>
            {' '}
            {message.body}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ padding: 20, borderTop: '1px solid #ddd' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
      </form>
    </div>
  );
};

export default Messages;
