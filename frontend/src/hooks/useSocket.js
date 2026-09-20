import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from '../socket.js';
import uiStore from '../store/ui.js';

const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      queryClient.setQueryData(['messages'], (old) => (
        old ? [...old, message] : [message]
      ));
    });

    socket.on('newChannel', () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    });

    socket.on('removeChannel', (payload) => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      const { currentChannelId, setCurrentChannelId } = uiStore.getState();
      if (currentChannelId === payload.id) {
        setCurrentChannelId(null);
      }
    });

    socket.on('renameChannel', () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.disconnect();
    };
  }, [queryClient]);
};

export default useSocket;
