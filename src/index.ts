import express from 'express';
import dotenv from 'dotenv';
import config from './config/config';

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8888);

const server: any = config(app);

server.listen(process.env.PORT || 8888, () =>
  console.log(`Servidor rodando na porta: ${process.env.PORT}`)
);
