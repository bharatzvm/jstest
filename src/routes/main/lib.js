import logger from 'tools/logger';

const getQuestions = async (req, res) => {
  if (!req.session) {
    logger.log('No session Associated');
    return { error: 'No session Associated' };
  }
  return {};
};

export default getQuestions;
