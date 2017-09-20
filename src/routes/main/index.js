import express from 'express';
import { getQuiz, getResults } from './controller';

const router = express.Router();

router.get('/', getQuiz);

router.post('/getResult', getResults);

export default router;
