import React from 'react';
import PropTypes from 'prop-types';

import { Result } from '../result';
import { Question, styles } from '../question';

const PQuiz = ({ questions, current, appStatus, answer, previousQuestion, nextQuestion, endQuiz, onClickFunction }) => {
  const totalCount = questions.length;
  return (
    <div>
      <div className={appStatus ? '' : styles.hide}>
        <div className={styles.body}>
          {questions.map((q, index) =>
            (<Question
              key={q.id}
              onClickFunction={onClickFunction}
              answeredCount={answer.answeredCount}
              question={q.question}
              selectedAnswer={q.selectedAnswer}
              id={q.id}
              index={index}
              isCurrent={current === index}
              totalCount={totalCount}
              options={q.options}
            />),
          )}
        </div>
        <button
          className={current === totalCount - 1 ? styles.inactive : [styles.nextButton, styles.navButton].join(' ')}
          tabIndex="0"
          onClick={() => nextQuestion(totalCount)}
        >
          &#62;
        </button>
        <button
          className={current === 0 ? styles.inactive : [styles.prevButton, styles.navButton].join(' ')}
          tabIndex="0"
          onClick={() => previousQuestion()}
        >
          &#60;
        </button>
        <button
          className={[styles.navButton, styles.endQuiz].join(' ')}
          tabIndex="0"
          onClick={() => endQuiz()}
        >
        X
        </button>
        <button
          className={[
            styles.navButton,
            answer.answeredCount === totalCount ? styles.goodTogo : '',
            styles.submitQuiz].join(' ')}
          tabIndex="0"
          onClick={() => endQuiz()}
        >
        submit
        </button>
      </div>
      <div className={appStatus ? styles.hide : ''}>
        <Result />
      </div>
    </div>
  );
};

PQuiz.defaultProps = {
  answer: {
    answers: {},
    answeredCount: 0,
  },
};

PQuiz.propTypes = {
  appStatus: PropTypes.bool.isRequired,
  answer: PropTypes.shape({
    answers: PropTypes.object, // eslint-disable-line
    answeredCount: PropTypes.number,
  }),
  current: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  onClickFunction: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  previousQuestion: PropTypes.func.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default PQuiz;
