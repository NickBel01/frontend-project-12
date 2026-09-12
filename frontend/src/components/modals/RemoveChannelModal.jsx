import { Modal, Button, Group, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';

const RemoveChannelModal = () => {
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
      closeModal();
    },
  });

  return (
    <Modal opened onClose={closeModal} title="Удалить канал">
      <Text>Удалить канал?</Text>
      <Group mt="md">
        <Button color="red" onClick={() => mutation.mutate()} loading={mutation.isPending}>
          Удалить
        </Button>
        <Button variant="default" onClick={closeModal}>Отмена</Button>
      </Group>
    </Modal>
  );
};

export default RemoveChannelModal;
