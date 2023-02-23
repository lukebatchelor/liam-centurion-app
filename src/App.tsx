import { useState } from "react";
import StartScreen from "./components/StartScreen";
import PlayingScreen from "./components/PlayingScreen";

function App() {
  const [playing, setPlaying] = useState(false);

  const onReadyClick = () => setPlaying(true);

  return (
    <>
      {!playing && <StartScreen onReadyClick={onReadyClick} />}
      {playing && <PlayingScreen />}
    </>
  );
}

export default App;
//
