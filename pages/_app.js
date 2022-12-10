import "../styles/globals.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const [scores, setScores] = useState();
  useEffect(() => {
    // refresh scores every interval================================================================
    let intv = setInterval(() => {
      fetch(process.env.NEXT_PUBLIC_DB)
        .then((res) => res.json())
        .then((res) => {
          sessionStorage.setItem("scores", JSON.stringify(res));
          setScores(res);
          console.log(res);
        })
        .catch((err) => console.log("Error", err));
    }, 1000);
  });
  //===============================================================================================

  useEffect(() => {
    const socket_temp = io.connect("https://riwaj-tetris.vercel.app:5000/");
    setSocket(socket_temp);
    return () => socket_temp.disconnect();
  }, []);
  return <Component {...pageProps} socket={socket} />;
}

export default MyApp;
