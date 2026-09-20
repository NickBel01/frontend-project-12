import {
  Menu, Button, ActionIcon, Box, Flex, Text, ScrollArea, NavLink,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useUI } from '../store/ui.js';

const Channels = ({ channels = [] }) => {
  const { t } = useTranslation();
  const setCurrentChannelId = useUI((state) => state.setCurrentChannelId);
  const currentChannelId = useUI((state) => state.currentChannelId);
  const openModal = useUI((state) => state.openModal);

  return (
    <Box w={300} p="xs">
      <Flex justify="space-between" align="center" mb="sm">
        <Text fw={600}>{t('chat.channels')}</Text>
        <Button size="xs" onClick={() => openModal('add')} aria-label="+">+</Button>
      </Flex>
      <ScrollArea>
        {channels.map((channel) => (
          <NavLink
            key={channel.id}
            active={currentChannelId === channel.id}
            onClick={() => setCurrentChannelId(channel.id)}
            label={`# ${channel.name}`}
            rightSection={channel.removable && (
              <Menu>
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    aria-label={t('chat.channelControl')}
                    onClick={(e) => e.stopPropagation()}
                  >
                    ⋮
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal('rename', channel.id);
                    }}
                  >
                    {t('modals.rename')}
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal('remove', channel.id);
                    }}
                  >
                    {t('modals.remove')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          />
        ))}
      </ScrollArea>
    </Box>
  );
};

export default Channels;
