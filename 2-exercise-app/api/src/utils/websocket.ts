import { Server } from 'ws';

const wss = new Server({ noServer: true });

export const setupWebSocket = (server) => {
  server.on('upgrade', (request, socket, head) => {
    try {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } catch (error) {
      console.log('Error in wss upgrade', error);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
  });

  wss.on('connection', (ctx) => {
    console.log('connected', wss.clients.size);
    ctx.on('message', (message) => {
      console.log(`Received message ${message}`);
      ctx.send(`You sent ${message}`);
    });

    ctx.on('close', () => {
      console.log('closed', wss.clients.size);
    });

    ctx.send('connection established');
  });
};

export default wss;