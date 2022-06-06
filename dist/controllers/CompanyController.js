"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestHelper_1 = require("../helpers/requestHelper");
const responseHelper_1 = require("../helpers/responseHelper");
const Company_1 = __importDefault(require("../models/Company"));
const AntifraudPj_1 = __importDefault(require("../services/AntifraudPj"));
class CompanyController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { insurance, cnpj, priority } = req.body;
                const newCompany = yield Company_1.default.create({
                    cnpj,
                    insurance,
                    priority,
                    phase: 0,
                });
                const antifraudPj = new AntifraudPj_1.default(cnpj, newCompany[0].id);
                antifraudPj.protesto();
                yield antifraudPj.action();
                (0, responseHelper_1.buildResponse)(res, newCompany, true, 'Empresa adicionada com sucesso', 201);
            }
            catch (error) {
                console.log(error);
                (0, responseHelper_1.buildResponse)(res, null, false, '', 500);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { data } = req.body;
                let body = Object.assign({}, data);
                if (req.file) {
                    const { key, location } = req.file;
                    const cartao_info = yield (0, requestHelper_1.postRequest)('https://p5mbksp0bb.execute-api.us-east-2.amazonaws.com', '/prod/v1/forms', { filename: key }, 'wmfiz8bt8I2uS0huCn7GppDQLrgpu2KZm39bTW90');
                    body.cartao_cnpj = Object.assign(Object.assign({}, cartao_info.data), { file: location });
                }
                const newCompany = yield Company_1.default.update(id, body);
                (0, responseHelper_1.buildResponse)(res, newCompany, true, 'Empresa atualizada com sucesso', 201);
            }
            catch (error) {
                console.log(error);
                (0, responseHelper_1.buildResponse)(res, null, false, '', 500);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comapnies = yield Company_1.default.findAll();
                (0, responseHelper_1.buildResponse)(res, comapnies, true, 'Empresas encontradas com sucesso', 200);
            }
            catch (error) {
                console.log(error);
                (0, responseHelper_1.buildResponse)(res, null, false, '', 500);
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comapny = yield Company_1.default.findById(Number(id));
                (0, responseHelper_1.buildResponse)(res, comapny, true, 'Empresa encontrada com sucesso', 200);
            }
            catch (error) {
                console.log(error);
                (0, responseHelper_1.buildResponse)(res, null, false, '', 500);
            }
        });
    }
    findByPhase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phase } = req.params;
                const comapny = yield Company_1.default.findByPhase(phase);
                (0, responseHelper_1.buildResponse)(res, comapny, true, 'Empresa encontrada com sucesso', 200);
            }
            catch (error) {
                console.log(error);
                (0, responseHelper_1.buildResponse)(res, null, false, '', 500);
            }
        });
    }
}
exports.default = new CompanyController();
