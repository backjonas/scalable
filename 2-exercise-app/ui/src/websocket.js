import { useState, useEffect } from "react";

function useWebSocket({
  socketUrl,
  retry: defaultRetry = 3,
  retryInterval = 1500
}) {
  const [data, setData] = useState();
  const [send, setSend] = useState(() => () => undefined);
  const [retry, setRetry] = useState(defaultRetry);
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      setReadyState(true);

      setSend(() => {
        return (data) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1);
        }, retryInterval);
      }
    };
    return () => {
      ws.close();
    };
  }, [retry]); 

  return { send, data, readyState };
}

const formatMessage = (data) => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
};

function getTimestamp() {
  return new Date().getTime();
}

export default useWebSocket;