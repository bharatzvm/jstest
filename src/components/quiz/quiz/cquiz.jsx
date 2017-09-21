import { connect } from 'react-redux';

import Quiz from './pquiz';

import {
  answerQuestion,
  getPreviousQuestion,
  getNextQuestion,
  getResults,
} from './actionCreators';

const mapStateToProps = state => ({
  questions: state.questions,
  current: state.current,
  answer: state.answer,
  appStatus: state.appStatus,
});

const mapDispatchToProps = dispatch => ({
  onClickFunction: (answerIndex, questionIndex, answeredCount, max) => dispatch(answerQuestion(answerIndex, questionIndex, answeredCount, max)),
  previousQuestion: () => dispatch(getPreviousQuestion()),
  nextQuestion: max => dispatch(getNextQuestion(max)),
  endQuiz: () => dispatch(getResults()),
});

const quizApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);

export default quizApp;
