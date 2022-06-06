import { Request, Response } from 'express';
import { postRequest } from '../helpers/requestHelper';
import { buildResponse } from '../helpers/responseHelper';
import Company from '../models/Company';

import AntifraudPjService from '../services/AntifraudPj';
class CompanyController {
  async create(req: Request, res: Response) {
    try {
      const { insurance, cnpj, priority } = req.body;

      const newCompany = await Company.create({
        cnpj,
        insurance,
        priority,
        phase: 0,
      });

      const antifraudPj = new AntifraudPjService(cnpj, newCompany[0].id);

      antifraudPj.protesto();
      await antifraudPj.action();

      buildResponse(
        res,
        newCompany,
        true,
        'Empresa adicionada com sucesso',
        201
      );
    } catch (error: any) {
      console.log(error);
      buildResponse(res, null, false, '', 500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { data } = req.body;

      let body: any = { ...data };
      if (req.file) {
        const { key, location }: any = req.file;
        const cartao_info = await postRequest(
          'https://p5mbksp0bb.execute-api.us-east-2.amazonaws.com',
          '/prod/v1/forms',
          { filename: key },
          'wmfiz8bt8I2uS0huCn7GppDQLrgpu2KZm39bTW90'
        );
        body.cartao_cnpj = { ...cartao_info.data, file: location };
      }
      const newCompany = await Company.update(id, body);

      buildResponse(
        res,
        newCompany,
        true,
        'Empresa atualizada com sucesso',
        201
      );
    } catch (error: any) {
      console.log(error);
      buildResponse(res, null, false, '', 500);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const comapnies = await Company.findAll();
      buildResponse(
        res,
        comapnies,
        true,
        'Empresas encontradas com sucesso',
        200
      );
    } catch (error) {
      console.log(error);
      buildResponse(res, null, false, '', 500);
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comapny = await Company.findById(Number(id));
      buildResponse(res, comapny, true, 'Empresa encontrada com sucesso', 200);
    } catch (error) {
      console.log(error);
      buildResponse(res, null, false, '', 500);
    }
  }

  async findByPhase(req: Request, res: Response) {
    try {
      const { phase } = req.params;
      const comapny = await Company.findByPhase(phase);
      buildResponse(res, comapny, true, 'Empresa encontrada com sucesso', 200);
    } catch (error) {
      console.log(error);
      buildResponse(res, null, false, '', 500);
    }
  }
}

export default new CompanyController();
