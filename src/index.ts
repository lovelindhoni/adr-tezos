import express from 'express';
import cors from "cors";
import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');

const privateKey = 'edskRw9cmJHdamzp2kM6aHJ2ZP3DfYPkd7FBnC6L8bpX7gaLBjLqx6mEg9vXmaSndN6MsKVvSTbKB8rmENV4aieogHKdtFWv6v';

Tezos.setProvider({ signer: new InMemorySigner(privateKey) });

const contractAddress = "KT1LoxZ4EKVpFobLjEo5R3CoZZwB6MtDToSB"
const contract = await Tezos.contract.at(contractAddress);

const app = express();
const env = process.env

const port = 6969;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/blockchain", async (req, res) =>{
    const data = req.body;
    console.log(data);
    const now = new Date();
    data.timestamp = now.toISOString();
    const operation = await contract.methodsObject.default(data).send();
    await operation.confirmation();
    res.send('Operation confirmed!');
})

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;

// :)
