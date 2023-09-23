const express = require("express")

const { listarContas,
    obterSaldoConta,
    obterExtratoConta,
    listarContasAtivas,
    listarContasInativas } = require("../controladores/contas/consultar")

const { criarConta } = require("../controladores/contas/criar")
const { atualizarConta } = require("../controladores/contas/atualizar")
const { excluirConta } = require("../controladores/contas/excluir")

const { validarSenhaBanco,
    validarBodyConta,
    validarConta,
    validarQueryConta } = require("../intermediarios/contas")

const contas = express()

contas.get("/contas", validarSenhaBanco, listarContas)
contas.get("/contas/ativas", validarSenhaBanco, listarContasAtivas)
contas.get("/contas/inativas", validarSenhaBanco, listarContasInativas)
contas.get("/contas/saldo", validarQueryConta, obterSaldoConta)
contas.get("/contas/extrato", validarQueryConta, obterExtratoConta)
contas.post("/contas", validarBodyConta, criarConta)
contas.put("/contas/:numeroConta/usuario", validarConta, validarBodyConta, atualizarConta)
contas.delete("/contas/:numeroConta", validarConta, excluirConta)

module.exports = contas