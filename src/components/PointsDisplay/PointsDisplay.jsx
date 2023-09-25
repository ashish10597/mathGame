import { useSelector } from "react-redux";

const PointsDisplay = () => {
  const gameData = useSelector((state) => state.gd);

  return (
    <table>
      <thead>
        <tr>
          <td>Questions</td>
          <td>Correct</td>
          <td>Incorrect</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{gameData.questions}</td>
          <td>{gameData.correct}</td>
          <td>{gameData.incorrect}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PointsDisplay;
