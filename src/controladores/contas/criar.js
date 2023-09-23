
const fs = require("fs/promises")
const { lerBancoDados } = require("../../utilitarios/lerBD")

let idConta = 1
let idNovaConta = ""

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    try {

        const { banco, contas, saques, depositos, transferencias } = await lerBancoDados()

        const validarCpf = contas.some(conta => conta.usuario.cpf === cpf)
        const validarEmail = contas.some(conta => conta.usuario.email === email)

        if (validarCpf || validarEmail) {
            return res.status(403).json(
                { mensagem: `Já existe uma conta com o cpf ou e-mail informado!` }
            )
        }

        const ultimaConta = contas[contas.length - 1]

        if (!ultimaConta)
            idNovaConta = String(idConta)
        else {
            idConta = Number(ultimaConta.numero.slice(ultimaConta.numero.length - 1))
            idConta++
            idNovaConta = String(idConta)
        }

        const conta = {
            numero: banco.agencia + "-" + banco.numero + "-" + idNovaConta,
            saldo: 0,
            status: "ativa",
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        contas.push(conta)

        const bancoParse = { banco, contas, saques, depositos, transferencias }

        await fs.writeFile(
            "./src/bancodedados/bancodedados.json", JSON.stringify(bancoParse)
        )

        return res.status(201).json()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}

module.exports = { criarConta }



