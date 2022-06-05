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
const pg_1 = __importDefault(require("../database/pg"));
class Company {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield (0, pg_1.default)('companies').returning('*').insert(data).orderBy('id');
            return req;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('chamou');
            const req = yield (0, pg_1.default)('companies')
                .returning('*')
                .update(Object.assign({}, data))
                .where('id', id);
            return req;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield (0, pg_1.default)('companies').where({ id: id });
            return req;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield (0, pg_1.default)('companies').orderBy('id');
            return req;
        });
    }
    findByPhase(phase) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield (0, pg_1.default)('companies').where('phase', phase);
            return req;
        });
    }
}
exports.default = new Company();
