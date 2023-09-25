import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useDispatch, useSelector } from "react-redux";

export default function BasicBars() {
  const gameData = useSelector((state) => state.gd);

  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  const solutionChecker = (answerGiven, actualAnswer) =>
    parseInt(answerGiven) === parseInt(actualAnswer);

  const data = Object.entries(
    groupBy(gameData?.questionAttempted, "type")
  )?.map((elem) => elem[1]);

  // console.log(data);

  const correctData = data?.map(
    (d) =>
      (d
        .map((de) => {
          if (solutionChecker(de.answerGiven, de.actualAnswer)) return true;
          else return false;
        })
        ?.filter((d) => d === true).length /
        d.map((de) => {
          if (solutionChecker(de.answerGiven, de.actualAnswer)) return true;
          else return false;
        }).length) *
      100
  );

  const typeToMathOperation = {
    0: "MULTIPLICATION WITH X",
    1: "DIVISION",
    2: "SQUARE",
    3: "CUBE",
    4: "CUBE ROOT",
    5: "SQUARE ROOT",
    6: "MULTIPLICATION",
  };

  return (
    <BarChart
      // xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
      xAxis={[
        {
          scaleType: "band",
          data: data?.map((d) => typeToMathOperation[d[0].type]),
        },
      ]}
      series={[{ data: correctData }]}
      width={900}
      height={300}
    />
  );
}
