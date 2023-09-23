const express = require("express")
const { realizarDeposito,
    realizarSaque,
    realizarTransferencia } = require("../controladores/transacoes")

const { validardepositar,
    validarSacar,
    validarTransferir } = require("../intermediarios/transacoes")


const transacoes = express();

transacoes.post("/transacoes/depositar", validardepositar, realizarDeposito);
transacoes.post("/transacoes/sacar", validarSacar, realizarSaque);
transacoes.post("/transacoes/transferir", validarTransferir, realizarTransferencia);

module.exports = transacoes;