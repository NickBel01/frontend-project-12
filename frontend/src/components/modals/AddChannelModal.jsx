import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { createChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const closeModal = useUIStore((state) => state.closeModal);
  const setCurrentChannelId = useUIStore((state) => state.setCurrentChannelId);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => {
        if (value.length < 3 || value.length > 20) return t('modals.validation.length');
        return null;
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (name) => createChannel(name),
    onSuccess: (channel) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      setCurrentChannelId(channel.id);
      notifications.show({ message: t('notifications.channelCreated'), color: 'green' });
      closeModal();
      form.reset();
    },
  });

  return (
    <Modal opened onClose={closeModal} title={t('modals.addChannel')}>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values.name))}>
        <TextInput
          label={t('modals.channelName')}
          data-autofocus
          {...form.getInputProps('name')}
        />
        <Button type="submit" mt="md" loading={mutation.isPending}>{t('modals.submit')}</Button>
      </form>
    </Modal>
  );
};

export default AddChannelModal;
