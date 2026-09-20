import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import {
  Flex, Loader, Center, Text, Divider,
} from '@mantine/core';
import { fetchChannels } from '../api/channels.js';
import { useUI } from '../store/ui.js';
import useSocket from '../hooks/useSocket.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import Modals from '../components/modals/index.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const currentChannelId = useUI((state) => state.currentChannelId);
  const setCurrentChannelId = useUI((state) => state.setCurrentChannelId);

  const { data: channels, isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
    onError: () => {
      notifications.show({ message: t('notifications.loadError'), color: 'red' });
    },
  });

  useSocket();

  const activeChannelId = currentChannelId ?? channels?.[0]?.id ?? null;

  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannelId) {
      setCurrentChannelId(channels[0].id);
    }
  }, [channels, currentChannelId, setCurrentChannelId]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <Flex h="100vh">
      <Channels channels={channels} />
      <Divider orientation="vertical" />
      {activeChannelId ? (
        <Messages channelId={activeChannelId} />
      ) : (
        <Center flex={1}>
          <Text c="dimmed">{t('chat.selectChannel')}</Text>
        </Center>
      )}
      <Modals />
    </Flex>
  );
};

export default ChatPage;
