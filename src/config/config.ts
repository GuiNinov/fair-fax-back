import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from '../routes';
// import { createSocketServer } from '../socket/socket';

const configServer = (app: any) => {
  dotenv.config();

  app.use(cors());

  app.use(express.json({ limit: '50mb' }));

  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // const socketServer = createSocketServer(app);

  // const http = socketServer.httpServer

  // const io = socketServer.io

  routes(app);

  return app;
};

export default configServer;
