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
import { getTweetStatus, getRetweetUsers, getFollowers } from './model';

const title = 'Javascript Quiz';
const description = 'A simple javascript test';

const getUserId = async (req, res, tweetId) => {
  logger.log(req.uId)(`Get UserId for tweet: ${tweetId}`);
  try {
    const {
      user: {
        id_str: userId,
      },
    } = await getTweetStatus(req, res, tweetId);
    return userId;
  } catch (error) {
    logger.error(req.uId)(error);
    return null;
  }
};

const getRetweetUserIds = async (req, res, tweetId) => {
  logger.log(req.uId)(`Get RetweetUserIds for tweet: ${tweetId}`);
  try {
    const retweetUserIds = await getRetweetUsers(req, res, tweetId);
    return retweetUserIds;
  } catch (error) {
    logger.error(req.uId)(error);
    return null;
  }
};

const getUniqueFollowers = async (req, res, users) => {
  logger.log(req.uId)(`Finding Unique followers of ${users.length} number of users`);
  const data = await Promise.all(users.map(x => getFollowers(req, res, x)));
  const uniqueFollowers = new Set(data.reduce((x, y) => x.concat(y), []));
  return uniqueFollowers.size;
};

const askForAtweet = async (req, res) => {
  const tweetId = req.query && req.query.tweetId;
  if (!tweetId) return res.send({ error: 'no input' });
  // const tweetId = '926015776473088001'; // sehwag
  // const tweetId = '926414921683812352'; // fossblr
  // const tweetId = '926333108621676545'; // kenwheeler
  try {
    const userId = await getUserId(req, res, tweetId);
    const retweetUserIds = await getRetweetUserIds(req, res, tweetId);
    const uniqueFollowers = await getUniqueFollowers(req, res, [...retweetUserIds, userId]);
    return res.send({ reach: uniqueFollowers, tweetId });
  } catch (error) {
    return res.send(error);
  }
};

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
  logger.log(req.uId)('Serving Quiz Page');
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
  logger.log(req.uId)('Serving results json');
  return res.send({ total, correct, wrong, unattempted });
};

export { askForAtweet, getQuiz, getResults };
