import util from 'util';
import request from 'tools/request';
import logger from 'tools/logger';

const getTweetStatusUri = '/1.1/statuses/show.json?id=%s';
const getRetweetUsersUri = '/1.1/statuses/retweeters/ids.json?id=%s&count=100&cursor=%d';

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
  if (cursor === 0) return [];
  const options = {
    uri: util.format(getRetweetUsersUri, tweetId, cursor),
    method: 'GET',
    json: true,
  };
  try {
    const { data, statusCode } = await request(options, req, res);
    if (statusCode === 200) {
      const { ids, next_cursor } = { ...data };
      return ids.concat(await getRetweetUsers(req, res, tweetId, next_cursor));
    }
    logger.error(req.uId)(`${statusCode}: ${options.uri}`);
    logger.error(req.uId)(`${JSON.stringify(data)}`);
    throw new Error(`Unable to handle tweet status response for tweetId: ${tweetId}`);
  } catch (error) {
    return Promise.reject({ error });
  }
};
