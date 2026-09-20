import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import {
  Flex, Text, Title, Loader, Center, TextInput, ScrollArea, Box, Divider,
} from '@mantine/core';
import { fetchMessages, sendMessage } from '../api/messages.js';
import { useAuth } from '../store/auth.js';
import { clean } from '../utils/profanity.js';

const Messages = ({ channelId }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const username = useAuth((state) => state.username) || 'admin';

  const { data: allMessages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

  const messages = allMessages.filter(
    (m) => String(m.channelId) === String(channelId),
  );

  const mutation = useMutation({
    mutationFn: (body) => sendMessage(clean(body), channelId, username),
    onSuccess: () => setText(''),
    onError: () => {
      notifications.show({ message: t('notifications.networkError'), color: 'red' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || mutation.isPending) return;
    mutation.mutate(text);
  };

  return (
    <Flex direction="column" h="100vh" flex={1}>
      <ScrollArea flex={1} p="lg">
        <Title order={3} mb="md">{t('chat.messages')}</Title>
        {isLoading && (
          <Center>
            <Loader />
          </Center>
        )}
        {!isLoading && messages.map((message) => (
          <Box key={message.id} mb="sm">
            <Text component="span" fw={700}>{message.username}:</Text>
            {' '}
            <Text component="span">{message.body}</Text>
          </Box>
        ))}
      </ScrollArea>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} p="lg">
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('chat.messagePlaceholder')}
          aria-label="Новое сообщение"
          disabled={mutation.isPending}
        />
      </Box>
    </Flex>
  );
};

export default Messages;
