const { lerBancoDados } = require("../utilitarios/lerBD")

const validardepositar = async (req, res, next) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || numero_conta.trim() === "" || isNaN(valor))
        return res.status(400).json(
            { mensagem: `O número de conta e o valor devem ser informados!` }
        )

    if (isNaN(Number(numero_conta.split("-").join(""))) || numero_conta.length < 10)
        return res.status(400).json({ mensagem: `O numero de conta é inválido!` })

    try {
        const { contas } = await lerBancoDados()

        const encontrarConta = contas.find(conta => conta.numero === numero_conta)

        if (!encontrarConta)
            return res.status(404).json({ mensagem: `A conta informada não existe!` })

        if (valor <= 0)
            return res.status(400).json({ mensagem: `O valor é inválido!` })

        next()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

const validarSacar = async (req, res, next) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta ||
        numero_conta.trim() === "" ||
        isNaN(valor) ||
        !senha ||
        senha.trim() === ""
    )
        return res.status(400).json(
            { mensagem: `O número de conta, o valor e a senha devem ser informados!` }
        )

    if (isNaN(Number(numero_conta.split("-").join(""))) || numero_conta.length < 10)
        return res.status(400).json({ mensagem: `O numero de conta é inválido!` })

    if (valor <= 0)
        return res.status(400).json({ mensagem: `O valor é inválido!` })

    try {
        const { contas } = await lerBancoDados()

        const encontrarConta = contas.find(conta => conta.numero === numero_conta)

        if (!encontrarConta)
            return res.status(404).json({ mensagem: `A conta informada não existe!` })

        if (encontrarConta.usuario.senha !== senha)
            return res.status(400).json({ mensagem: `A senha é inválida!` })

        if ((encontrarConta.saldo - valor) < 0)
            return res.status(403).json({ mensagem: `Saldo insuficiente!` })

        next()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

const validarTransferir = async (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem ||
        numero_conta_origem.trim() === "" ||
        !numero_conta_destino ||
        numero_conta_destino.trim() === "" ||
        isNaN(valor) ||
        !senha ||
        senha.trim() === ""
    )
        return res.status(400).json(
            {
                mensagem: `Os números de conta de origem e destino, o valor e a senha devem ser informados!`
            });

    if (isNaN(Number(numero_conta_origem.split("-").join(""))) || numero_conta_origem.length < 10)

        return res.status(400).json({ mensagem: `O numero de conta de origem é inválido!` })

    if (isNaN(Number(numero_conta_destino.split("-").join(""))) || numero_conta_destino.length < 10)

        return res.status(400).json({ mensagem: `O numero de conta de destino é inválido!` })

    if (numero_conta_origem === numero_conta_destino)
        return res.status(400).json(
            { mensagem: `Os numeros de conta de origem e destino devem ser diferentes!` }
        );

    if (valor <= 0)
        return res.status(400).json({ mensagem: `O valor é inválido!` })

    try {
        const { contas } = await lerBancoDados()

        const encontrarContaOrigem = contas.find(
            conta => conta.numero === numero_conta_origem
        )

        const encontrarContaDestino = contas.find(
            conta => conta.numero === numero_conta_destino
        )

        if (!encontrarContaOrigem)
            return res.status(404).json({ mensagem: `A conta origem informada não existe!` })

        if (!encontrarContaDestino)
            return res.status(404).json({ mensagem: `A conta destino informada não existe!` })

        if (encontrarContaOrigem.usuario.senha !== senha)
            return res.status(400).json({ mensagem: `A senha é inválida!` })

        if ((encontrarContaOrigem.saldo - valor) < 0)
            return res.status(403).json({ mensagem: `Saldo insuficiente!` })

        next()

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }
}

module.exports = {
    validardepositar,
    validarSacar,
    validarTransferir
}