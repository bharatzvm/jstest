import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styles as questionStyles } from '../question';
import styles from './results.scss';

const Result = ({ total, wrong, correct, unattempted }) => {
  const borderClass = [styles.tBorder].join(' ');
  return (
    <div className={questionStyles.body}>
      <div className={questionStyles.activeQuestion}>
        <h3 className={styles.textCenter}> Thank you </h3>
        <table
          className={[borderClass, styles.table].join(' ')}
        >
          <tbody>
            <tr>
              <th className={borderClass}>total</th>
              <th className={borderClass}>correct</th>
              <th className={borderClass}>unattempted</th>
              <th className={borderClass}>wrong</th>
            </tr>
            <tr>
              <th className={borderClass}>{total}</th>
              <th className={borderClass}>{correct}</th>
              <th className={borderClass}>{unattempted}</th>
              <th className={borderClass}>{wrong}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Result.propTypes = {
  total: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  unattempted: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  ...state.results.result,
});

const resultContainer = connect(mapStateToProps, null)(Result);

export default resultContainer;
