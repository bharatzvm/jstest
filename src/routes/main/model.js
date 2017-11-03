import util from 'util';
import request from 'tools/request';
import logger from 'tools/logger';

const getTweetStatusUri = '/1.1/statuses/show.json?id=%s';
const getRetweetUsersUri = '/1.1/statuses/retweeters/ids.json?id=%s&count=100&cursor=%s';
const getFollowersUri = '/1.1/followers/ids.json?user_id=%s&count=5000&cursor=%s';

export const getTweetStatus = async (req, res, tweetId) => {
  const options = {
    uri: util.format(getTweetStatusUri, tweetId),
    method: 'GET',
    json: true,
  };
  try {
    const { data, statusCode } = await request(options, req, res);
    if (statusCode === 200) return { ...data };
    logger.error(req.uId)(`${statusCode}: ${options.uri}`);
    logger.error(req.uId)(`${JSON.stringify(data)}`);
    throw new Error(`Unable to handle tweet status response for tweetId: ${tweetId}`);
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const getRetweetUsers = async (req, res, tweetId, cursor) => {
  if (cursor === '0') return [];
  let offset = cursor;
  if (!cursor) offset = -1;
  const options = {
    uri: util.format(getRetweetUsersUri, tweetId, offset),
    method: 'GET',
    json: true,
  };
  try {
    const { data, statusCode } = await request(options, req, res);
    if (statusCode === 200) {
      const { ids, next_cursor_str: nextCursor } = { ...data };
      return ids.concat(await getRetweetUsers(req, res, tweetId, nextCursor));
    }
    if (statusCode === 429) {
      logger.error(req.uId)('Rate limit exceeded');
      logger.error(req.uId)(`${statusCode}: ${options.uri}`);
      return [];
    }
    logger.error(req.uId)(`${statusCode}: ${options.uri}`);
    logger.error(req.uId)(`${JSON.stringify(data)}`);
    throw new Error(`Unable to handle tweet status response for tweetId: ${tweetId}`);
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const getFollowers = async (req, res, userId, cursor) => {
  if (cursor === '0') return [];
  let offset = cursor;
  if (!cursor) offset = -1;
  const options = {
    uri: util.format(getFollowersUri, userId, offset),
    method: 'GET',
    json: true,
  };
  try {
    const { data, statusCode } = await request(options, req, res);
    if (statusCode === 200) {
      const { ids, next_cursor_str: nextCursor } = { ...data };
      return ids.concat(await getFollowers(req, res, userId, nextCursor));
    }
    if (statusCode === 429) {
      logger.error(req.uId)('Rate limit exceeded');
      logger.error(req.uId)(`${statusCode}: ${options.uri}`);
      return [];
    }
    logger.error(req.uId)(`${statusCode}: ${options.uri}`);
    logger.error(req.uId)(`${JSON.stringify(data)}`);
    throw new Error(`Unable to handle Followers response for twitter user: ${userId}`);
  } catch (error) {
    return Promise.reject({ error });
  }
};
