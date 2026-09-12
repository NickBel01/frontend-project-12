import { Menu, Button, ActionIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useUI } from '../store/ui.js';

const Channels = ({ channels }) => {
  const { t } = useTranslation();
  const setCurrentChannelId = useUI((state) => state.setCurrentChannelId);
  const currentChannelId = useUI((state) => state.currentChannelId);
  const openModal = useUI((state) => state.openModal);

  return (
    <div style={{
      width: 300, borderRight: '1px solid #ddd', overflowY: 'auto', padding: 10,
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{t('chat.channels')}</h3>
        <Button size="xs" onClick={() => openModal('add')} aria-label="+">+</Button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {channels.map((channel) => (
          <li
            key={channel.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              cursor: 'pointer',
              background: currentChannelId === channel.id ? '#e0e0e0' : 'transparent',
              borderRadius: 5,
              marginBottom: 5,
            }}
          >
            <span
              onClick={() => setCurrentChannelId(channel.id)}
              style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              # {channel.name}
            </span>
            {channel.removable && (
              <Menu>
                <Menu.Target>
                  <ActionIcon variant="subtle" size="sm" aria-label={t('chat.channelControl')}>⋮</ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => openModal('rename', channel.id)}>{t('modals.rename')}</Menu.Item>
                  <Menu.Item color="red" onClick={() => openModal('remove', channel.id)}>{t('modals.remove')}</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
