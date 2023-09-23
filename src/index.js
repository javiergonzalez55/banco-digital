// Dessafio modulo II. Banco Digital

const express = require("express")
const rotasContas = require("./roteadores/contas")
const rotasTransacoes = require("./roteadores/transacoes")

const app = express()

app.use(express.json())

app.use(rotasContas)
app.use(rotasTransacoes)

app.listen(3000)