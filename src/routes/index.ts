import { Request, Response, NextFunction } from 'express';
import express from 'express';
import CompanyController from '../controllers/CompanyController';

var router = express.Router();
export default (app: any) => {
  router.get('/v1', (req: Request, res: Response) =>
    res.json({ status: 'online' })
  );

  router.get('/company', CompanyController.findAll);

  router.get('/company/:id', CompanyController.find);

  router.post('/company', CompanyController.create);

  router.put('/company/:id', CompanyController.update);

  router.get('/phase/:phase', CompanyController.findByPhase);

  app.use(router);
};
