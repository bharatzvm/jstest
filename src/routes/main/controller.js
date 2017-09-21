import React from 'react';
import ReactDOM from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import uuidV4 from 'uuid/v4';

import Html from 'components/Html';
import logger from 'tools/logger';
import request from 'tools/request';
import assets from 'compiled/assets.json';
import App from 'components/App';
import { Quiz, reducer } from 'components/quiz';

const title = 'Javascript Quiz';
const description = 'A simple javascript test';

const getQuiz = async (req, res) => {
  const requestOptions = {
    method: 'GET',
    baseUrl: 'https://cdn.rawgit.com/santosh-suresh/',
    uri: '/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json',
    json: true,
  };
  const questionAndAnswer = await request(requestOptions, req, res);
  const flatQnA = questionAndAnswer.map(q => ({
    question: q.text,
    id: uuidV4(),
    options: q.options.map((x, index) => ({
      id: index,
      value: x,
    })),
    answer: q.answer,
  }));
  req.session.answers = flatQnA.map(x => ({ id: x.id, answer: x.answer })).reduce((a, b) => ({ ...a, [b.id]: b.answer }), {});
  const initialState = {
    questions: flatQnA.map(({ question, id, options }) => ({ question, id, options })),
    totalCount: flatQnA.length,
  };
  const store = createStore(reducer, initialState);
  const children = ReactDOM.renderToString(
    <Provider store={store}>
      <App>
        <Quiz />
      </App>
    </Provider>,
  );
  const preloadedState = store.getState();
  const scripts = [assets.app.js];
  const styles = [assets.app.css || 'test.css'];
  const data = {
    title,
    description,
    children,
    scripts,
    styles,
    preloadedState,
  };
  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
  logger.log('Serving Quiz Page');
  res.send(`<!doctype html>${html}`);
};

const getResults = async (req, res) => {
  const allegedAnswers = req.body;
  const actualAnswers = req.session.answers;
  if (!actualAnswers) return res.status(500).json({ error: 'Sorry, you\'r too late' });
  const total = Object.keys(actualAnswers).length;
  if (!total) return res.status(500).json({ error: 'Sorry, we screwed up' });
  let correct = 0;
  let wrong = 0;
  let unattempted = total;
  Object.entries(allegedAnswers.answers).forEach(([key, value]) => {
    unattempted -= 1;
    if (value !== null && value === actualAnswers[key]) {
      correct += 1;
    } else {
      wrong += 1;
    }
  });
  logger.log('Serving results json');
  return res.send({ total, correct, wrong, unattempted });
};

export { getQuiz, getResults };
