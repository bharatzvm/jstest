import React from 'react';
import PropTypes from 'prop-types';

import styles from './question.scss';

const Question = ({ onClickFunction, question, id, isCurrent, answeredCount, index, totalCount, options }) => (
  <div className={isCurrent ?
    [styles.activeQuestion].join(' ') : styles.inactive}
  >
    <div className={styles.currentCount}>
      Javascript Quiz {index + 1} of {totalCount}
    </div>
    <div className={styles.question}>
      {question}
    </div>
    {options.map((option, optionIndex) =>
      (<div
        key={option.id}
        onClick={() => onClickFunction(option.id, id, answeredCount, totalCount)}
        role="button"
        tabIndex="0"
        className={styles.option}
      >
        {String.fromCharCode(optionIndex + 65)} - {option.value}
      </div>),
    )}
    <div className={styles.pushToBottom}>
      {options.map((option, optionIndex) =>
        (<div
          className={styles.bottomOptions}
          key={option.id}
          onClick={() => onClickFunction(option.id, id, answeredCount, totalCount)}
          role="button"
          tabIndex="0"
        >
          {String.fromCharCode(optionIndex + 65)}
        </div>),
      )}
    </div>
  </div>
);

Question.propTypes = {
  answeredCount: PropTypes.number.isRequired,
  onClickFunction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
};

export default Question;
