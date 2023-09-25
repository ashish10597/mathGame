import Input from "../Input/Input";
import "./GameGenerator.scss";

const GameGenerator = (game, dispatch, valueInput, value1, value2) => {
  const valueToCalculate1 = value1;
  const valueToCalculate2 = value2;

  switch (game) {
    case 0: {
      //MULTIPLICATION WITH X
      const answer = valueToCalculate2;

      return (
        <div className="equation-box">
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />{" "}
          x <span> {value1}</span> ={" "}
          <span>{valueToCalculate1 * valueToCalculate2}</span>
        </div>
      );
    }
    case 1: {
      //DIVISION
      const answer = valueToCalculate1;

      return (
        <div className="equation-box">
          <span>{valueToCalculate1 * valueToCalculate2}</span> /
          <span> {valueToCalculate2}</span> ={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
    }
    case 2: {
      //SQUARE
      const answer = valueToCalculate2 ** 2;

      return (
        <div className="equation-box">
          <span>Square of </span>
          <span>{valueToCalculate2} </span>={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
    }
    case 3: {
      //CUBE
      const answer = valueToCalculate2 ** 3;

      return (
        <div className="equation-box">
          <span>Cube of </span>
          <span>{valueToCalculate2} </span>={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
    }
    case 4: {
      //CUBE ROOT
      const answer = valueToCalculate2;

      return (
        <div className="equation-box">
          <span>Cube root of </span>
          <span>{valueToCalculate2 ** 3} </span>={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
    }
    case 5: {
      //SQUARE ROOT
      const answer = valueToCalculate2;

      return (
        <div className="equation-box">
          <span>Square root of </span>
          <span>{valueToCalculate2 ** 2} </span>={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
    }
    default:
      //MULTIPLICATION
      const answer = valueToCalculate2 * valueToCalculate1;

      return (
        <div className="equation-box">
          <span>{valueToCalculate1}</span>x <span> {valueToCalculate2}</span> ={" "}
          <Input dispatch={dispatch} answer={answer} valueInput={valueInput} />
        </div>
      );
  }
};

const Box = ({ valueInput, status }) => (
  <span className={`box , box-${status ? "correct" : "incorrect"}`}>
    {valueInput}
  </span>
);

const solutionMatcher = (queObject) => {
  return (
    <div className="equation-box-attempted-solution">
      <div className="equation-box-attempted-solution-answer">
        <span className="equation-box-attempted-solution-answer-span">
          Your Answer
        </span>
        <span className="equation-box-attempted-solution-answer-value">
          {queObject.answerGiven}
        </span>
      </div>
      <div className="equation-box-attempted-solution-answer">
        <span className="equation-box-attempted-solution-answer-span">
          Actual Answer
        </span>
        <span className="equation-box-attempted-solution-answer-value">
          {queObject.actualAnswer}
        </span>
      </div>
    </div>
  );
};

export const AttemptedQuestionLayoutGenerator = (queObject) => {
  // console.log(queObject);
  switch (parseInt(queObject.type)) {
    case 0: {
      //MULTIPLICATION WITH X
      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />{" "}
            <span>x</span>
            <span> {queObject.value1}</span>
            <span>= </span>
            <span>{queObject.value1 * queObject.value2}</span>
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    case 1: {
      //DIVISION

      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>{queObject.value1 * queObject.value2}</span> <span>/</span>
            <span> {queObject.value2}</span> <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    case 2: {
      //SQUARE

      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>Square of </span>
            <span>{queObject.value2} </span> <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    case 3: {
      //CUBE
      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>Cube of </span>
            <span>{queObject.value2} </span>
            <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    case 4: {
      //CUBE ROOT
      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>Cube root of </span>
            <span>{queObject.value2 ** 3} </span>
            <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    case 5: {
      //SQUARE ROOT
      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>Square root of </span>
            <span>{queObject.value2 ** 2} </span>
            <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
    }
    default:
      //MULTIPLICATION
      return (
        <div className="equation-box-attempted">
          <div className="equation-box-attempted-inner">
            <span>{queObject.value1}</span> <span>x</span>{" "}
            <span> {queObject.value2}</span> <span>=</span>{" "}
            <Box
              valueInput={queObject.answerGiven}
              status={
                parseInt(queObject.actualAnswer) ===
                parseInt(queObject.answerGiven)
              }
            />
          </div>
          {/* Solution Matcher */}
          <div className="equation-box-attempted-solution-container">
            {solutionMatcher(queObject)}
          </div>
        </div>
      );
  }
};

export default GameGenerator;
