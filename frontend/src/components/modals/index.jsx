import { useUI } from '../../store/ui.js';
import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const Modals = () => {
  const { type, channelId } = useUI((state) => state.modal);

  return (
    <>
      <AddChannelModal opened={type === 'add'} />
      <RenameChannelModal opened={type === 'rename'} channelId={channelId} />
      <RemoveChannelModal opened={type === 'remove'} channelId={channelId} />
    </>
  );
};

export default Modals;
