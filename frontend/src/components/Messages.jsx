import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchMessages, sendMessage } from '../api.js';
import { useAuth } from '../store/auth.js';
import { clean } from '../utils/profanity.js';

const Messages = ({ channelId }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const username = useAuth((state) => state.username) || 'admin';

  const { data: allMessages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

  const messages = Array.isArray(allMessages)
    ? allMessages.filter((m) => String(m.channelId) === String(channelId))
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage(clean(text), channelId, username);
      setText('');
    } catch (err) {
      console.error('Ошибка отправки', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <h3>{t('chat.messages')}</h3>
        {isLoading && <div>{t('chat.loadingMessages')}</div>}
        {!isLoading && messages.map((message) => (
          <div key={message.id} style={{ marginBottom: 10, wordBreak: 'break-word' }}>
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
          placeholder={t('chat.messagePlaceholder')}
          aria-label="Новое сообщение"
          disabled={sending}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
      </form>
    </div>
  );
};

export default Messages;
