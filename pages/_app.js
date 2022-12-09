import "../styles/globals.css";
import { useEffect, useState } from "react";

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
        })
        .catch((err) => console.log("Error", err));
    }, 1000);
    //===============================================================================================

    //clear interval when the page unmounts
    return () => {
      clearInterval(intv);
    };
    //================================================================================================
  }, []);

  return <Component {...pageProps} scores={scores} />;
}

export default MyApp;
