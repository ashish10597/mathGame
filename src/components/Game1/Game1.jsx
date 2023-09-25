import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";
import { gameDataAction } from "../store/gameData-slice";
import GameGenerator from "../GameGenerator/GameGenerator";
import "./Game1.scss";

const Game1 = () => {
  const gameData = useSelector((state) => state.gd);
  const dispatch = useDispatch();

  const [valueToCalculate1, valueToCalculate2, randomNumber] = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 6);
    let number1 = 20;
    let number2 = 10;

    //For square and square root: keep value till 30
    if (randomNumber === 2 || randomNumber === 5) {
      number1 = 30;
      number2 = 30;
    }
    const valueToCalculate1 = Math.floor(Math.random() * number1) + 1;
    const valueToCalculate2 = Math.floor(Math.random() * number2) + 1;

    return [valueToCalculate1, valueToCalculate2, randomNumber];
  }, [gameData.questions]);

  // console.log(valueToCalculate1, valueToCalculate2, randomNumber);

  useEffect(() => {
    console.log("restart");
    dispatch(gameDataAction.restart());
  }, []);

  const gameGeneratorFunction = useCallback(() => {
    if (gameData.questions >= 0) {
      return GameGenerator(
        randomNumber,
        dispatch,
        gameData.valueInput,
        valueToCalculate1,
        valueToCalculate2
      );
    } else return null;
  }, [gameData.questions, gameData.valueInput]);

  const validateAnswer = (e) => {
    e.preventDefault();
    console.log(gameData.valueInput);
    if (!gameData.valueInput) return;
    if (parseInt(gameData.answer) === parseInt(gameData.valueInput)) {
      dispatch(gameDataAction.questionsAction());
      dispatch(gameDataAction.correctAnswer());
      dispatch(
        gameDataAction.questionAttempt({
          attempt: {
            type: randomNumber,
            value1: valueToCalculate1,
            value2: valueToCalculate2,
            answerGiven: gameData.valueInput,
            actualAnswer: gameData.answer,
          },
        })
      );
      dispatch(gameDataAction.setValueInput({ valueInput: "" }));
    } else {
      dispatch(gameDataAction.questionsAction());
      dispatch(gameDataAction.incorrectAnswer());
      dispatch(
        gameDataAction.questionAttempt({
          attempt: {
            type: randomNumber,
            value1: valueToCalculate1,
            value2: valueToCalculate2,
            answerGiven: gameData.valueInput,
            actualAnswer: gameData.answer,
          },
        })
      );
      dispatch(gameDataAction.setValueInput({ valueInput: "" }));
    }
  };

  return (
    <div className="form-container">
      {gameData.start && (
        <div className="form">
          <div className="form-header">
            <span>Fill in the Box</span>
          </div>
          <form onSubmit={(e) => validateAnswer(e)}>
            <div className="form-block">
              {gameGeneratorFunction(dispatch)}
              <button className="form-block-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Game1;
