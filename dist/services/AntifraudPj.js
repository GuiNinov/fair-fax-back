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
const BasicData_1 = __importDefault(require("./Antifraud/PJ/BasicData"));
const Company_1 = __importDefault(require("../models/Company"));
const Addresses_1 = __importDefault(require("./Antifraud/PJ/Addresses"));
const CapTable_1 = __importDefault(require("./Antifraud/PJ/CapTable"));
const Activity_1 = __importDefault(require("./Antifraud/PJ/Activity"));
const Processos_1 = __importDefault(require("./Antifraud/PJ/Processos"));
const QsaProcesses_1 = __importDefault(require("./Antifraud/PJ/QsaProcesses"));
const Partners_1 = __importDefault(require("./Antifraud/PJ/Partners"));
const SpcPj_1 = __importDefault(require("./Antifraud/PJ/SpcPj"));
const Protestos_1 = __importDefault(require("./Antifraud/PJ/Protestos"));
class AntifraudPjService {
    constructor(cnpj, company_id) {
        this.url = process.env.ANTIFRAUD_PJ_API;
        this.cnpj = cnpj;
        this.analysis_id = company_id;
    }
    action() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.basicData();
            yield Promise.all([
                this.addressess(),
                this.capTable(),
                this.activity(),
                this.processes(),
                this.qsaProcesses(),
                this.partners(),
                this.spc(),
            ]);
            return { valid: true };
        });
    }
    basicData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basicData = new BasicData_1.default(this.url, this.cnpj);
                const res = yield basicData.find();
                if (res) {
                    yield Company_1.default.update(this.analysis_id, {
                        basic_data: Object.assign({}, res),
                    });
                }
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Basic Data',
                    valid: false,
                };
            }
        });
    }
    addressess() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addressess = new Addresses_1.default(this.url, this.cnpj);
                const res = yield addressess.find();
                if (res) {
                    yield Company_1.default.update(this.analysis_id, {
                        addressess: res,
                    });
                }
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Address',
                    valid: false,
                };
            }
        });
    }
    capTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const capTable = new CapTable_1.default(this.url, this.cnpj);
                const res = yield capTable.find();
                yield Company_1.default.update(this.analysis_id, {
                    cap_table: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Cap Table',
                    valid: false,
                };
            }
        });
    }
    activity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = new Activity_1.default(this.url, this.cnpj);
                const res = yield activity.find();
                yield Company_1.default.update(this.analysis_id, {
                    activity: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Activity',
                    valid: false,
                };
            }
        });
    }
    processes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const processos = new Processos_1.default(this.url, this.cnpj);
                const res = yield processos.find();
                yield Company_1.default.update(this.analysis_id, {
                    processos: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Processes',
                    valid: false,
                };
            }
        });
    }
    qsaProcesses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qsaProcesses = new QsaProcesses_1.default(this.url, this.cnpj);
                const res = yield qsaProcesses.find();
                yield Company_1.default.update(this.analysis_id, {
                    processos_qsa: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - QSA Processes',
                    valid: false,
                };
            }
        });
    }
    partners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const relations = new Partners_1.default(this.url, this.cnpj);
                const res = yield relations.find();
                yield Company_1.default.update(this.analysis_id, {
                    relations: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - Sócios e Funcionários',
                    valid: false,
                };
            }
        });
    }
    spc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const spcPj = new SpcPj_1.default(this.url, this.cnpj);
                const res = yield spcPj.find();
                yield Company_1.default.update(this.analysis_id, {
                    spc: res,
                });
                return res;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - SPC',
                    valid: false,
                };
            }
        });
    }
    protesto() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const protesto = new Protestos_1.default(this.url, this.cnpj, this.analysis_id);
                protesto.find();
                return;
            }
            catch (error) {
                console.log(error);
                return {
                    error: 'Problemas internos na API de DV PJ - SPC',
                    valid: false,
                };
            }
        });
    }
}
exports.default = AntifraudPjService;
