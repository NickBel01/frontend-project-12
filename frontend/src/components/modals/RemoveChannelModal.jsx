import { Modal, Button, Group, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { removeChannel } from '../../api/channels.js';
import { useUI } from '../../store/ui.js';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { channelId } = useUI((state) => state.modal);
  const closeModal = useUI((state) => state.closeModal);
  const currentChannelId = useUI((state) => state.currentChannelId);
  const setCurrentChannelId = useUI((state) => state.setCurrentChannelId);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => removeChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      if (currentChannelId === channelId) {
        const channels = queryClient.getQueryData(['channels']) || [];
        const remaining = channels.filter((c) => c.id !== channelId);
        setCurrentChannelId(remaining[0]?.id ?? null);
      }
      notifications.show({ message: t('notifications.channelRemoved'), color: 'green' });
      closeModal();
    },
  });

  return (
    <Modal
      opened
      onClose={closeModal}
      title={t('modals.removeChannel')}
      transitionProps={{ duration: 0 }}
      keepMounted={false}
    >
      <Text>{t('modals.removeQuestion')}</Text>
      <Group mt="md">
        <Button color="red" onClick={() => mutation.mutate()} loading={mutation.isPending}>
          {t('modals.remove')}
        </Button>
        <Button variant="default" onClick={closeModal}>{t('modals.cancel')}</Button>
      </Group>
    </Modal>
  );
};

export default RemoveChannelModal;
