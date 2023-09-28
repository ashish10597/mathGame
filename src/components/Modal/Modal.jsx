import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AttemptedQuestionLayoutGenerator } from "../GameGenerator/GameGenerator";
import "./Modal.scss";
import Chart from "./../Chart/Chart";

import smiley30less from "./../../assets/smiley-30-less.svg";
import smiley30to40 from "./../../assets/smiley-30-40.svg";
import smiley40to60 from "./../../assets/smiley-40-60.svg";
import smiley60to70 from "./../../assets/smiley-60-70.svg";
import smiley70to90 from "./../../assets/smiley-70-90.svg";
import smiley90to100 from "./../../assets/smiley-90-100.svg";

import Loader from "./../Loading/Loader";

const Modal = () => {
  const gameData = useSelector((state) => state.gd);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 4000);

  if (load)
    return (
      <div className="loader">
        <Loader />{" "}
        <span>
          Please Wait! Compiler is doing some hard work. Let him calculate the
          result.{" "}
        </span>
      </div>
    );

  if (gameData?.questionAttempted?.length === 0)
    return (
      <div className="solution-block, no-attempts">
        <span>Try to solve some questions. I see no atempts.</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ff6b6b"
          class="w-6 h-6"
          height={"48px"}
          width={"48px"}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
    );

  const smileyFinder = (gameData) => {
    const score = (gameData?.correct * 100) / gameData.questions;

    if (parseInt(score) < 30) {
      return [
        smiley30less,
        "Are you serious!! Need lots of hard work. Please practice more. Pathetic Performance",
      ];
    }
    if (parseInt(score) > 30 && parseInt(score) < 40) {
      return [
        smiley30to40,
        "Get some tution. You need to put more effort. Failing doesn't suits you.",
      ];
    }
    if (parseInt(score) > 40 && parseInt(score) < 60) {
      return [
        smiley40to60,
        "Need more improvement. Anyways, you just have passed. So congratulations",
      ];
    }
    if (parseInt(score) > 60 && parseInt(score) < 70) {
      return [
        smiley60to70,
        "Good. Keep on your hard work. Wo will definetly improve.",
      ];
    }
    if (parseInt(score) > 70 && parseInt(score) < 90) {
      return [
        smiley70to90,
        "Nice Try. Bit more improvement, and you can declare yourself a mathematician.",
      ];
    } else {
      return [
        smiley90to100,
        "Wow.. You are a genius. Killer performance.. Don't study anymore.",
      ];
    }
  };

  const [smilyImage, resultMessage] = smileyFinder(gameData);

  return (
    <>
      <div className="result-card">
        <span className="result-card-marks">
          You got{" "}
          <span className="result-card-marks-data">
            {gameData?.correct} out of {gameData.questions}.
          </span>{" "}
        </span>
        <div className="result-card-display">
          <span>
            Hence, you have scored{" "}
            {parseFloat((gameData?.correct * 100) / gameData.questions).toFixed(
              2
            )}{" "}
            %
          </span>
          <div className="smiley">
            <img src={smilyImage} />
          </div>
        </div>

        <span className="result-card-message">{resultMessage} </span>
      </div>
      <div className="solution-block-divider">&nbsp;</div>
      <div className="solution-block-divider">&nbsp;</div>
      <div className="solution-block-divider" style={{ marginBottom: "20px" }}>
        &nbsp;
      </div>

      {gameData?.questionAttempted?.map((queObject, i) => {
        return (
          <div className="solution-block">
            <div className="solution-block-elements">
              <span className="solution-block-elements-slno">Q{i + 1}.</span>{" "}
              {AttemptedQuestionLayoutGenerator(queObject)}
            </div>

            <div className="solution-block-divider">&nbsp;</div>
          </div>
        );
      })}
      <Chart />
    </>
  );
};

export default Modal;
