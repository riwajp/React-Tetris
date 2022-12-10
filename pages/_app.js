import "../styles/globals.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket_temp = io("ws://riwaj-tetris.vercel.app");
    setSocket(socket_temp);
    return () => socket_temp.disconnect();
  }, []);
  return <Component {...pageProps} socket={socket} />;
}

export default MyApp;
