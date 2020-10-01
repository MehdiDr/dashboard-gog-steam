import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import express  from 'express';
import 'express-async-errors';
import cors from 'cors';

import BaseRouter from './routes';


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

const app: express.Application = express();
app.use(cors({origin: 'https://dashboard-client.vercel.app/'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', cors(), BaseRouter);

app.get('/', cors(), (req, res) => {
  res.send('root route');
});

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

if (!process.env.IS_NOW) {
  const PORT: string = process.env.PORT || '9000';
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
