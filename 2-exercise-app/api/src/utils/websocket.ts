import { Server } from 'ws';
import querystring from 'query-string';


export const wss = new Server({ noServer: true });
export const webSockets = [];

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

  wss.on('connection', (webSocket, req) => {
    const splitUrl = req.url.split('?');
    if (splitUrl.length > 1) {
      const urlParams = querystring.parse(splitUrl[1]);
      webSockets[urlParams.user.toString()] = webSocket;
    }
    webSocket.on('message', (message) => {
      webSocket.send(`You sent ${message}`);
    });

    webSocket.on('close', () => {
      console.log('closed', wss.clients.size);
    });

    webSocket.send('connection established');
  });
};

