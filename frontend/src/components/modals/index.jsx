import { useUI } from '../../store/ui.js';
import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const Modals = () => {
  const { type } = useUI((state) => state.modal);

  if (type === 'add') return <AddChannelModal />;
  if (type === 'rename') return <RenameChannelModal />;
  if (type === 'remove') return <RemoveChannelModal />;
  return null;
};

export default Modals;
