import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { renameChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';

const RenameChannelModal = () => {
  const { channelId } = useUIStore((state) => state.modal);
  const closeModal = useUIStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => {
        if (value.length < 3 || value.length > 20) return 'От 3 до 20 символов';
        return null;
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (name) => renameChannel(channelId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      closeModal();
    },
  });

  return (
    <Modal opened onClose={closeModal} title="Переименовать канал">
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values.name))}>
        <TextInput
          label="Новое имя"
          data-autofocus
          {...form.getInputProps('name')}
        />
        <Button type="submit" mt="md" loading={mutation.isPending}>Отправить</Button>
      </form>
    </Modal>
  );
};

export default RenameChannelModal;
