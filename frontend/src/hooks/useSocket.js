import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from '../socket.js';
import uiStore from '../store/ui.js';

const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleNewMessage = (message) => {
      queryClient.setQueryData(['messages'], (old) => (
        old ? [...old, message] : [message]
      ));
    };

    const handleNewChannel = () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    };

    const handleRemoveChannel = (payload) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      const { currentChannelId, setCurrentChannelId } = uiStore.getState();
      if (currentChannelId === payload.id) {
        setCurrentChannelId(null);
      }
    };

    const handleRenameChannel = () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [queryClient]);
};

export default useSocket;
