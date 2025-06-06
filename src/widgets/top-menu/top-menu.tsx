'use client';

import { useEffect, useState } from 'react';

import { io, Socket } from 'socket.io-client';

interface TopMenuProps {
  className?: string;
}

const TIME_INTERVAL = 1000;

export const TopMenu = ({ className }: TopMenuProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeSessionsCount, setActiveSessionsCount] = useState<number>(0);
  const [, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_INTERVAL);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ['websocket', 'polling'],
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('Connected to socket server');
      setIsConnected(true);

      socketInstance.emit('getActiveSessionsCount', (count: number) => {
        setActiveSessionsCount(count);
      });
    });

    socketInstance.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });

    socketInstance.on('activeSessionsCount', (count: number) => {
      setActiveSessionsCount(count);
    });

    socketInstance.on('connect_error', error => {
      // eslint-disable-next-line no-console
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      className={`${className} flex items-center justify-between border-b bg-white p-4 shadow-sm`}
    >
      <div className="flex items-center space-x-6 text-sm">
        {/* Active Sessions Counter */}
        <div className="flex items-center space-x-2">
          <div
            className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="text-gray-600">Active Sessions:</span>
          <span className="rounded bg-blue-50 px-2 py-1 font-semibold text-blue-600">
            {activeSessionsCount}
          </span>
        </div>

        {/* Real-time Date and Time */}
        <div className="flex items-center space-x-2">
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-mono text-gray-700">
            {formatDateTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
};
