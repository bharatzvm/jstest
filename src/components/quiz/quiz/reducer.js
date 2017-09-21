import { combineReducers } from 'redux';

import {
  CHOOSE_ANSWER,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
  QUIT,
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
} from './actionTypes';

const resultShape = {
  isFetching: false,
  isFailure: false,
  result: {
    total: 0,
    wrong: 0,
    correct: 0,
    unattempted: 0,
  },
};

const results = (state = resultShape, action) => {
  switch (action.type) {
    case FETCH_RESULTS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_RESULTS_FAILURE:
      return { ...state, isFailure: true };
    case FETCH_RESULTS_SUCCESS:
      return { ...state, result: action.data };
    default:
      return state;
  }
};

const currentQuestion = (state = 0, action) => {
  switch (action.type) {
    case PREVIOUS_QUESTION:
      return state - 1 >= 0 ? state - 1 : 0;
    case NEXT_QUESTION:
      return state + 1 >= action.max ? state : state + 1;
    case CHOOSE_ANSWER:
      return state + 1 >= action.max ? state : state + 1;
    default:
      return state;
  }
};

const answer = (state = { answers: {}, answeredCount: 0 }, action) => {
  switch (action.type) {
    case CHOOSE_ANSWER: {
      const answers = { ...state.answers, [action.questionId]: action.answerId };
      return { answers, answeredCount: Object.keys(answers).length };
    }
    default:
      return state;
  }
};

const status = (state = true, action) => {
  switch (action.type) {
    case QUIT:
      return false;
    default:
      return state;
  }
};

const questions = (state = []) => state;

const totalCount = (state = []) => state;

const appReducers = combineReducers({
  current: currentQuestion,
  answer,
  appStatus: status,
  questions,
  totalCount,
  results,
});

export default appReducers;
