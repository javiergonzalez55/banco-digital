const { lerBancoDados } = require("../utilitarios/lerBD")

const validarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco)
        return res.status(404).json({ mensagem: `A senha do Banco não foi informada` })

    if (senha_banco !== "Cubos123Bank")
        return res.status(400).json({ mensagem: `A senha do Banco é inválida` })

    next()
}

const validarBodyConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome ||
        nome.trim() === "" ||
        !cpf ||
        cpf.trim() === "" ||
        !data_nascimento ||
        data_nascimento.trim() === "" ||
        !telefone ||
        telefone.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !senha ||
        senha.trim() === ""
    )

        return res.status(404).json(
            {
                mensagem: `O nome, cpf, data de nascimento, telefone, email e senha devem ser informados!`
            })

    if (cpf.length !== 11)
        return res.status(400).json({ mensagem: `O cpf é inválido!` })

    const filtrarArrobaEmail = email.split("").filter(caractere => caractere === "@")

    if (!filtrarArrobaEmail ||
        filtrarArrobaEmail.length !== 1 ||
        email.indexOf("@") === 0 ||
        email.indexOf("@") === email.length - 1
    )

        return res.status(400).json({ mensagem: `O email é inválido!` })

    const filtrarPontoEmail = email.split().filter(caractere => caractere === ".")

    if (!filtrarPontoEmail ||
        email.indexOf(".") === 0 ||
        email.lastIndexOf(".") === email.length - 1 ||
        email.lastIndexOf(".") < email.indexOf("@")
    )

        return res.status(400).json({ mensagem: `O email é inválido!` })

    next()
}

const validarQueryConta = async (req, res, next) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha)
        return res.status(400).json({ mensagem: `O número de conta e a senha devem ser informados!` })

    if (isNaN(Number(numero_conta.split("-").join(""))) || numero_conta.length < 10)
        return res.status(400).json({ mensagem: `O numero de conta é inválido!` })

    try {
        const { contas } = await lerBancoDados()

        const encontrarConta = contas.find(conta => conta.numero === numero_conta)

        if (!encontrarConta)
            return res.status(404).json({ mensagem: `A conta informada não existe!` })

        if (encontrarConta.usuario.senha !== senha)
            return res.status(400).json({ mensagem: `A senha é inválida!` })

        next()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

const validarConta = async (req, res, next) => {
    const { numeroConta } = req.params

    if (isNaN(Number(numeroConta.split("-").join(""))) || numeroConta.length < 10)
        return res.status(400).json({ mensagem: `O numero de conta é inválido!` })

    try {
        const { contas } = await lerBancoDados()

        const contaEncontrada = contas.find(conta => conta.numero === numeroConta)

        if (!contaEncontrada)
            return res.status(404).json({ mensagem: `A conta informada não existe!` })

        next()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

module.exports = {
    validarSenhaBanco,
    validarBodyConta,
    validarConta,
    validarQueryConta
}

