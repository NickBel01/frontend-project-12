import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { renameChannel } from '../../api/channels.js';
import { useUI } from '../../store/ui.js';
import { clean } from '../../utils/profanity.js';
import { validateChannelName } from '../../utils/validation.js';

const RenameChannelModal = ({ opened, channelId }) => {
  const { t } = useTranslation();
  const closeModal = useUI((state) => state.closeModal);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => validateChannelName(value, t),
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
    <Modal
      opened={opened}
      onClose={closeModal}
      title={t('modals.renameChannel')}
      transitionProps={{ duration: 0 }}
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(clean(values.name)))}>
        <TextInput
          label={t('modals.channelName')}
          placeholder={t('modals.channelNamePlaceholder')}
          aria-label={t('modals.channelName')}
          data-autofocus
          {...form.getInputProps('name')}
        />
        <Button type="submit" mt="md" loading={mutation.isPending}>{t('modals.submit')}</Button>
      </form>
    </Modal>
  );
};

export default RenameChannelModal;
