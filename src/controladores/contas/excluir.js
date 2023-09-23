
const fs = require("fs/promises")
const { lerBancoDados } = require("../../utilitarios/lerBD")

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params

    try {
        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        const contaEncontrada = contas.find(conta => conta.numero === numeroConta)

        if (contaEncontrada.saldo !== 0)
            return res.status(403).json(
                { mensagem: `A conta possui saldo positivo e não tem permissão de ser ecluida!!!` }
            )

        contas.filter(conta => {
            if (conta.numero === numeroConta && conta.status === "ativa") {
                return conta.status = "inativa"
            } else
                return res.status(400).json({ mensagem: `A conta já foi excluida!!!` })
        })

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

        return res.status(204).json()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

module.exports = { excluirConta }



