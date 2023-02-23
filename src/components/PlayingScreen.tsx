import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import useInterval from "../hooks/useInterval";
import shotGlassSvg from "../assets/shot-glass-clipart.svg";

const debug = false;

type Props = {};
export default function PlayingScreen(props: Props) {
  const [count, setCount] = useState(0);
  const [drinkCount, setDrinkCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => setStartTime(Date.now()), []);
  const update = () => {
    setCount(count + 1);
  };
  useInterval(update, 500);

  if (!startTime) return null;
  const totalSecondsSinceStart = Math.floor((Date.now() - startTime) / 1000);
  const minsSinceStart = Math.floor(totalSecondsSinceStart / 60);
  const secondsSinceMinStart = totalSecondsSinceStart - minsSinceStart * 60;
  const timerStr = `${padNumber(minsSinceStart)}:${padNumber(
    secondsSinceMinStart
  )}`;
  const drinksOwed = minsSinceStart + 1;
  const waiting = drinksOwed <= drinkCount;
  const drinkButtonText = waiting ? "Waiting..." : "Drink!";
  const drinkButtonAnimation = waiting ? "" : "animate-custom-ping";
  const gameOver = drinkCount === 100;
  const debugAddTime = () => {
    if (!debug) return;
    setStartTime((startTime) => Number(startTime) - 120 * 1000);
  };
  const onDrinkClick = () => {
    setDrinkCount(drinkCount + 1);
  };

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
                const contrast =
                  drinkIdx >= drinkCount && drinkIdx >= drinksOwed
                    ? "contrast-50"
                    : "";

                const dropshadow =
                  drinkIdx === drinkCount
                    ? "drop-shadow-[2px_4px_6px_black]"
                    : "";
                return (
                  <img
                    src={shotGlassSvg}
                    alt="shot glass"
                    className={`h-8 m-1 ${grayscale} ${dropshadow} ${contrast}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center pt-8">
        <button
          type="button"
          disabled={waiting}
          onClick={onDrinkClick}
          className={`text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xl px-10 py-4 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${drinkButtonAnimation}`}
        >
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
