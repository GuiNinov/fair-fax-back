"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CompanyController_1 = __importDefault(require("../controllers/CompanyController"));
var router = express_1.default.Router();
exports.default = (app) => {
    router.get('/v1', (req, res) => res.json({ status: 'online' }));
    router.get('/company', CompanyController_1.default.findAll);
    router.get('/company/:id', CompanyController_1.default.find);
    router.post('/company', CompanyController_1.default.create);
    router.put('/company/:id', CompanyController_1.default.update);
    router.get('/phase/:phase', CompanyController_1.default.findByPhase);
    app.use(router);
};
