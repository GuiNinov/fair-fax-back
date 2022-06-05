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
exports.postRequest = exports.getRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const access_key = process.env.AWS_DV_API_KEY;
const getRequest = (url, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, axios_1.default)({
        method: 'get',
        url: endpoint,
        baseURL: url,
        headers: {
            'x-api-key': access_key,
        },
        timeout: 150000,
    });
    return res;
});
exports.getRequest = getRequest;
const postRequest = (url, endpoint, data = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, axios_1.default)({
        method: 'post',
        url: endpoint,
        baseURL: url,
        data,
        headers: {
            'x-api-key': access_key,
        },
        timeout: 150000,
    });
    return res;
});
exports.postRequest = postRequest;
