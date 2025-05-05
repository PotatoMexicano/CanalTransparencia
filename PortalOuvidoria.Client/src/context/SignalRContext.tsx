import React, { createContext, useContext, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useDispatch } from 'react-redux';
import { chamadoApi } from '@/api/chamadoApi';
import { toast } from 'sonner';

interface SignalRContextProps {
  connection: HubConnection | null;
}

const SignalRContext = createContext<SignalRContextProps>({ connection: null });

const toastId = 'notification-signalR-new-data-toast';

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const connect = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_URL}/hub/notification`)
        .withAutomaticReconnect()
        .build();

      await newConnection.start();
      console.log('🔌 Conectado ao SignalR');

      newConnection.on('AtualizarDados', () => {
        console.log('📡 Evento recebido: AtualizarDados');
        dispatch(chamadoApi.util.invalidateTags(["Chamados"]));
        toast.info('Novos chamados disponíveis!', {
          id: toastId
        });
      });

      setConnection(newConnection);
    };

    connect();

    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
