import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import useInterval from "../hooks/useInterval";
import shotGlassSvg from "../assets/shot-glass-clipart.svg";

const params = new URLSearchParams(window.location.search);
const debugJumpTimeSecs = params.has("debug") ? Number(params.get("debug")) : 0;

type Props = {};
export default function PlayingScreen(props: Props) {
  const [drinkCount, setDrinkCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalSecondsSinceStart, setTotalSecondsSinceStart] = useState(0);

  useEffect(() => setStartTime(Date.now()), []);
  useInterval(() => setTotalSecondsSinceStart(Math.floor((Date.now() - Number(startTime)) / 1000)), 500);

  if (!startTime) return null;
  const minsSinceStart = Math.floor(totalSecondsSinceStart / 60);
  const secondsSinceMinStart = totalSecondsSinceStart - minsSinceStart * 60;
  const timerStr = `${padNumber(minsSinceStart)}:${padNumber(secondsSinceMinStart)}`;
  const drinksOwed = minsSinceStart + 1;
  const waiting = drinksOwed <= drinkCount;
  const gameOver = drinkCount === 100;
  const drinkButtonText = gameOver ? "YEWWWWW" : waiting ? "Waiting..." : "Drink!";
  const drinkButtonAnimation = waiting || gameOver ? "" : "animate-custom-ping";
  const btnClasses = `${drinkButtonAnimation} text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xl px-10 py-4 text-center mr-2 mb-2`;

  const debugAddTime = () => {
    setStartTime((startTime) => Number(startTime) - debugJumpTimeSecs * 1000);
  };
  const onDrinkClick = () => setDrinkCount(drinkCount + 1);

  return (
    <div className="p-8">
      <h1 className="text-5xl pb-4 text-center" onClick={debugAddTime}>
        Centurion
      </h1>
      <h2 className="text-3xl text-center pb-4">{timerStr}</h2>
      <div>
        {Array.from({ length: 10 }).map((_el, rowIdx) => {
          return (
            <div className="flex justify-center">
              {Array.from({ length: 10 }).map((_el, colIdx) => {
                const drinkIdx = rowIdx * 10 + colIdx;
                const grayscale = drinkIdx >= drinkCount ? "grayscale" : "";
                const contrast = drinkIdx >= drinkCount && drinkIdx >= drinksOwed ? "contrast-50" : "";

                const dropshadow = drinkIdx === drinkCount ? "drop-shadow-[2px_4px_6px_black]" : "";
                return <img src={shotGlassSvg} alt="shot glass" className={`h-8 m-1 ${grayscale} ${dropshadow} ${contrast}`} />;
              })}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center pt-8">
        <button type="button" disabled={waiting || gameOver} onClick={onDrinkClick} className={btnClasses}>
          {drinkButtonText}
        </button>
      </div>
      <Confetti run={gameOver} />
    </div>
  );
}

function padNumber(num: number) {
  return String(num).padStart(2, "0");
}
