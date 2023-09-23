
const { format } = require("date-fns")
const fs = require("fs/promises")
const { lerBancoDados } = require("../utilitarios/lerBD")

const realizarDeposito = async (req, res) => {
    const { numero_conta, valor } = req.body

    try {
        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        contas.map(conta => {
            if (conta.numero === numero_conta) return conta.saldo += valor
        })

        const deposito = {
            data: format(new Date(), "yyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        }

        depositos.push(deposito)

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

        return res.status(204).json()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

const realizarSaque = async (req, res) => {
    const { numero_conta, valor } = req.body

    try {
        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        contas.map(conta => {
            if (conta.numero === numero_conta) return conta.saldo -= valor
        })

        const saque = {
            data: format(new Date(), "yyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        }

        saques.push(saque)

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

        return res.status(204).json()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

const realizarTransferencia = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body

    try {
        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        contas.map(conta => {
            if (conta.numero === numero_conta_origem) return conta.saldo -= valor
        })

        contas.map(conta => {
            if (conta.numero === numero_conta_destino) return conta.saldo += valor
        })

        const transferencia = {
            data: format(new Date(), "yyy-MM-dd HH:mm:ss"),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }

        transferencias.push(transferencia)

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

        return res.status(204).json()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

module.exports = {
    realizarDeposito,
    realizarSaque,
    realizarTransferencia
} 