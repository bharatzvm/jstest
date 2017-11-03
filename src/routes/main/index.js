import express from 'express';
import { askForAtweet, getResults } from './controller';

const router = express.Router();

router.get('/', askForAtweet);

router.post('/getResult', getResults);


export default router;
