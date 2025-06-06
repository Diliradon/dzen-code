# TopMenu with Socket.io Session Counter

This project includes a TopMenu component that displays real-time date/time and an active session counter using Socket.io.

## Features

- **Real-time Clock**: Displays current date and time, updating every second
- **Session Counter**: Shows the number of active browser sessions in real-time using Socket.io
- **Responsive Design**: Adapts to light/dark themes

## Setup Instructions

### 1. Start the Socket.io Server

Open a terminal and run:

```bash
yarn socket-server
```

This will start the Socket.io server on port 3001 (or the port specified in `SOCKET_PORT` environment variable).

### 2. Start the Next.js Application

In another terminal, run:

```bash
yarn dev
```

This will start the Next.js application on port 3000.

### 3. Environment Variables (Optional)

You can customize the Socket.io server URL by setting the following environment variable in your `.env.local` file:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## Component Usage

The TopMenu component is automatically included in the admin layout and displays in the upper right corner of the header.

### Features:
- **Date Display**: Shows the current date in "Weekday, Month Day, Year" format
- **Time Display**: Shows the current time in 24-hour format with seconds
- **Session Counter**: Displays the number of active sessions with a green indicator
- **Real-time Updates**: Both time and session count update automatically

## Technical Details

- **Frontend**: React component using Socket.io client
- **Backend**: Node.js Socket.io server
- **Event Handling**: 
  - `userConnected`: Increments session count
  - `userDisconnected`: Decrements session count
  - `activeSessionsCount`: Broadcasts current count to all clients

## Testing

To test the session counter:
1. Open multiple browser tabs/windows with the application
2. Watch the session counter increase
3. Close tabs to see the counter decrease

The counter should update in real-time across all open sessions. 