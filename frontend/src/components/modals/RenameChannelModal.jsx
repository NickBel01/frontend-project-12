import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { renameChannel } from '../../api.js';
import useUIStore from '../../store/ui.js';
import { clean } from '../../utils/profanity.js';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const { channelId } = useUIStore((state) => state.modal);
  const closeModal = useUIStore((state) => state.closeModal);
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
    mutationFn: (name) => renameChannel(channelId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      notifications.show({ message: t('notifications.channelRenamed'), color: 'green' });
      closeModal();
    },
  });

  return (
    <Modal opened onClose={closeModal} title={t('modals.renameChannel')}>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(clean(values.name)))}>
        <TextInput
          label={t('modals.newName')}
          data-autofocus
          {...form.getInputProps('name')}
        />
        <Button type="submit" mt="md" loading={mutation.isPending}>{t('modals.submit')}</Button>
      </form>
    </Modal>
  );
};

export default RenameChannelModal;
