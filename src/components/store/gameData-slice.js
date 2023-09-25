import { createSlice } from "@reduxjs/toolkit";

const gameDataSlice = createSlice({
  name: "gameDataSlice",

  initialState: {
    questions: 0,
    correct: 0,
    incorrect: 0,
    start: false,
    valueInput: "",
    answer: "",
    closeModal: true,
    questionAttempted: [], // {type: ... , value1: ... , value2: ... , answerGiven: ..., status: ...}
  },

  reducers: {
    questionsAction(state, action) {
      state.questions++;
    },
    setAnswer(state, action) {
      state.answer = action.payload.answer;
    },
    setValueInput(state, action) {
      state.valueInput = action.payload.valueInput;
    },
    stopPlay(state, action) {
      state.start = false;
    },
    startPlay(state, action) {
      state.start = true;
    },
    correctAnswer(state, action) {
      state.correct++;
    },
    incorrectAnswer(state, action) {
      state.incorrect++;
    },
    closeModalHandler(state, action) {
      state.closeModal = !state.closeModal;
    },
    questionAttempt(state, action) {
      state.questionAttempted.push(action.payload.attempt);
    },
    restart(state, action) {
      state.questions = 0;
      state.correct = 0;
      state.incorrect = 0;
      state.start = false;
      state.valueInput = "";
      state.answer = "";
      state.closeModal = true;
      state.questionAttempted = [];
    },
  },
});

export const gameDataAction = gameDataSlice.actions;

export default gameDataSlice;
