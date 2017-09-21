import fetch from 'isomorphic-fetch';

import {
  CHOOSE_ANSWER,
  PREVIOUS_QUESTION,
  NEXT_QUESTION,
  QUIT,
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
} from './actionTypes';

export const answerQuestion = (answerId, questionId, count, max) => ({
  type: CHOOSE_ANSWER,
  answerId,
  questionId,
  count,
  max,
});

export const getPreviousQuestion = () => ({
  type: PREVIOUS_QUESTION,
});

export const getNextQuestion = max => ({
  type: NEXT_QUESTION,
  max,
});

export const endQuiz = () => ({
  type: QUIT,
});

const helperAction = type => data => ({ type, data });

export const fetchResult = helperAction(FETCH_RESULTS_REQUEST);

export const fetchResultSuccess = helperAction(FETCH_RESULTS_SUCCESS);

export const fetchResultFailure = helperAction(FETCH_RESULTS_FAILURE);

export const getResults = () => (dispatch, getState) => {
  dispatch(endQuiz());
  dispatch(fetchResult());
  return fetch('/getResult', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ ...getState().answer }),
  })
    .then(res => res.json())
    .then(data => dispatch(fetchResultSuccess(data)))
    .catch(data => dispatch(fetchResultFailure(data)));
};
