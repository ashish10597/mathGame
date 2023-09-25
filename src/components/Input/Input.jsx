import { gameDataAction } from "../store/gameData-slice";
import "./Input.scss";
import "./../Base/common.scss";

const Input = ({ dispatch, answer, valueInput }) => {
  return (
    <div className="input">
      <input
        className="timer-input"
        type="number"
        value={valueInput}
        onChange={(e) => {
          dispatch(
            gameDataAction.setValueInput({ valueInput: e.target.value })
          );
          dispatch(gameDataAction.setAnswer({ answer: answer }));

          return;
        }}
        autoFocus
      />
    </div>
  );
};

export default Input;
