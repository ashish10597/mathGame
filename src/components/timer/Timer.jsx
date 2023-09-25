import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Timer.scss";
import "./../Base/common.scss";
import { gameDataAction } from "../store/gameData-slice";

const Timer = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gd);

  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    dispatch(gameDataAction.restart());
  }, []);

  useEffect(() => {
    if (start && minutes > 0) {
      let minutesToSec = minutes * 60;

      dispatch(gameDataAction.startPlay());

      let timerClock = setInterval(() => {
        minutesToSec -= 1;
        if (minutesToSec === 0) {
          dispatch(gameDataAction.stopPlay());
          clearInterval(timerClock);
          setStart(false);
          dispatch(gameDataAction.closeModalHandler());
          setTimer("00:00:00");
        }
        setTimer(timeCalculator(minutesToSec));
      }, 1000);

      return () => {
        console.log("clearing Now");
        setMinutes(minutesToSec / 60);
        clearInterval(timerClock);
      };
    }
  }, [start]);

  const startTimer = (e) => {
    e.preventDefault();

    if (minutes * 60 === 0) return;
    setStart(true);
    dispatch(gameDataAction.startPlay());
  };

  const stopTimer = (e) => {
    e.preventDefault();
    setStart(false);
    dispatch(gameDataAction.stopPlay());
  };

  const resetTimer = (e) => {
    e.preventDefault();
    setStart(false);
    setTimer("00:00:00");
    setMinutes(0);
    dispatch(gameDataAction.restart());
  };

  //   Utility Functions //////////
  const timeCalculator = (minutesToSec) => {
    let hr = padStartNumber(parseInt(Math.floor(minutesToSec / 3600)));
    let min = padStartNumber(parseInt(Math.floor(minutesToSec / 60)));
    let sec = padStartNumber(parseInt(minutesToSec % 60));

    return `${hr}:${min}:${sec}`;
  };

  const padStartNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  /////////////////////////////////////

  return (
    <div
      className={`timer-container , ${
        gameData.start ? "timer-container-top" : "timer-container-center"
      }`}
    >
      <form type="submit">
        <div className="timer-container-input-box" style={{ width: "100%" }}>
          <label>Type in minutes</label>
          <input
            disabled={start}
            value={Math.floor(minutes)}
            className="timer-input"
            type="number"
            onChange={(e) => {
              if (e.target.value > 0) return setMinutes(e.target.value * 1);
              else
                return alert(
                  "Certainly! Please provide a 'positive whole number'. As I cannot transport you to the past!! 🥹"
                );
            }}
          />
          <div className="timer-container-button-group">
            <button
              onClick={startTimer}
              disabled={start || minutes === 0}
              className="button-primary"
            >
              Start
            </button>
            <button
              onClick={stopTimer}
              disabled={!start}
              className="button-primary"
            >
              Stop
            </button>
            <button
              onClick={resetTimer}
              disabled={minutes * 60 === 0 ? true : false}
              className="button-primary"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Display Timer */}
      <div>
        <h2
          className={
            "timer-container-display" +
            (timer.split(":")[2] * 1 < 10 &&
            timer.split(":")[1] * 1 === 0 &&
            minutes * 60 > 0
              ? " timer-container-display-invert"
              : "")
          }
        >
          <span
            className={
              !start && minutes * 60 !== 0
                ? "timer-container-display-blink"
                : ""
            }
          >
            {timer}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Timer;
