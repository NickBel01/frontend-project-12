import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';

const AddChannelModal = () => {
  const closeModal = useUIStore((state) => state.closeModal);
  const setCurrentChannelId = useUIStore((state) => state.setCurrentChannelId);
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
    mutationFn: (name) => createChannel(name),
    onSuccess: (channel) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      setCurrentChannelId(channel.id);
      closeModal();
      form.reset();
    },
  });

  return (
    <Modal opened onClose={closeModal} title="Добавить канал">
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values.name))}>
        <TextInput
          label="Имя канала"
          data-autofocus
          {...form.getInputProps('name')}
        />
        <Button type="submit" mt="md" loading={mutation.isPending}>Отправить</Button>
      </form>
    </Modal>
  );
};

export default AddChannelModal;
