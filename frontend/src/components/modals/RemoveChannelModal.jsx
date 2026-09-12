import { Modal, Button, Group, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { removeChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { channelId } = useUIStore((state) => state.modal);
  const closeModal = useUIStore((state) => state.closeModal);
  const currentChannelId = useUIStore((state) => state.currentChannelId);
  const setCurrentChannelId = useUIStore((state) => state.setCurrentChannelId);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => removeChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      if (currentChannelId === channelId) {
        setCurrentChannelId(null);
      }
      notifications.show({ message: t('notifications.channelRemoved'), color: 'green' });
      closeModal();
    },
  });

  return (
    <Modal opened onClose={closeModal} title={t('modals.removeChannel')}>
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
