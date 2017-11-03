import request from 'request';

import logger from 'tools/logger';
import config from 'config';

const defaultHeaders = {
  'Content-Type': config.DEFAULT_API_CONTENT_TYPE,
};

const customRequest = (options, req, res) => {
  const option = { ...options };
  option.time = config.API_LOG_TIME;
  option.headers = { defaultHeaders, ...option.headers };
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      if (!error) {
        logger.api({ ...response.timings, uri: option.uri });
        resolve(body);
      } else {
        reject(error);
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
};

export default customRequest;
