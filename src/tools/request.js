import request from 'request';

import logger from 'tools/logger';
import config from 'config';

const defaultHeaders = {
  authorization: config.TWITTER_TOKEN,
  'Content-Type': config.DEFAULT_API_CONTENT_TYPE,
};

const baseUrl = 'https://api.twitter.com';

const customRequest = (options, req, res) => {
  const option = { baseUrl, ...options };
  option.time = config.API_LOG_TIME;
  option.headers = { ...defaultHeaders };
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      if (!error) {
        logger.api({ ...response.timings, uri: option.uri });
        resolve({ data: body, statusCode: response.statusCode });
      } else {
        reject(error);
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
};

export default customRequest;
