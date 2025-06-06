'use client';

import { useEffect, useState } from 'react';

import { io, Socket } from 'socket.io-client';

interface TopMenuProps {
  className?: string;
}

export const TopMenu = ({ className }: TopMenuProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState(0);
  const [, setSocket] = useState<Socket | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // eslint-disable-next-line no-magic-numbers
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Socket.io connection for session counter
  useEffect(() => {
    // Connect to Socket.io server
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
      {
        transports: ['websocket'],
      },
    );

    setSocket(socketInstance);

    // Listen for session count updates
    socketInstance.on('activeSessionsCount', (count: number) => {
      setActiveSessions(count);
    });

    // Notify server of new connection
    socketInstance.emit('userConnected');

    // Cleanup on unmount
    return () => {
      socketInstance.emit('userDisconnected');
      socketInstance.disconnect();
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1 dark:bg-green-900/20">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          {activeSessions} Active Sessions
        </span>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {formatDate(currentTime)}
        </div>
        <div className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};
