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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signer_1 = require("@taquito/signer");
const taquito_1 = require("@taquito/taquito");
const Tezos = new taquito_1.TezosToolkit('https://ghostnet.ecadinfra.com');
const privateKey = 'edskRw9cmJHdamzp2kM6aHJ2ZP3DfYPkd7FBnC6L8bpX7gaLBjLqx6mEg9vXmaSndN6MsKVvSTbKB8rmENV4aieogHKdtFWv6v';
Tezos.setProvider({ signer: new signer_1.InMemorySigner(privateKey) });
const contractAddress = "KT1LoxZ4EKVpFobLjEo5R3CoZZwB6MtDToSB";
const app = (0, express_1.default)();
const env = process.env;
const port = 6969;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/blockchain", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const contract = yield Tezos.contract.at(contractAddress);
    const now = new Date();
    data.timestamp = now.toISOString();
    const operation = yield contract.methodsObject.default(data).send();
    yield operation.confirmation();
    res.send('Operation confirmed!');
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
// :)
