
const fs = require("fs/promises")
const { lerBancoDados } = require("../../utilitarios/lerBD")

const atualizarConta = async (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    try {

        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        const contaEncontrada = contas.find(conta => conta.numero === numeroConta)

        const filtrarContas = contas.filter(conta => conta.numero !== numeroConta)

        const validarCpf = filtrarContas.some(conta => conta.usuario.cpf === cpf)
        const validarEmail = filtrarContas.some(conta => conta.usuario.email === email)

        if (validarCpf)
            return res.status(403).json(
                { mensagem: `O CPF informado já existe cadastrado!` }
            )

        if (validarEmail)
            return res.status(403).json(
                { mensagem: `O EMAIL informado já existe cadastrado!` }
            )

        contaEncontrada.usuario = { nome, cpf, data_nascimento, telefone, email, senha }

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

    return res.status(204).json()

}

module.exports = { atualizarConta };



