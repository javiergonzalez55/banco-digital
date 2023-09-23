
const { lerBancoDados } = require("../../utilitarios/lerBD")

const listarContas = async (req, res) => {

    try {
        const { contas } = await lerBancoDados()

        return res.status(200).json(contas)

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}

const listarContasAtivas = async (req, res) => {

    try {
        const { contas } = await lerBancoDados()

        const filtrarContasAtivas = contas.filter(
            conta => { return conta.status === "ativa" }
        )

        return res.status(200).json(filtrarContasAtivas)

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}

const listarContasInativas = async (req, res) => {

    try {
        const { contas } = await lerBancoDados()

        const filtrarContasInativas = contas.filter(
            conta => { return conta.status === "inativa" }
        )

        return res.status(200).json(filtrarContasInativas)

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}


const obterSaldoConta = async (req, res) => {
    const { numero_conta } = req.query

    try {
        const { contas } = await lerBancoDados()

        const contaEncontrada = contas.find(conta => conta.numero === numero_conta)

        return res.status(200).json({ Saldo: contaEncontrada.saldo })

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}

const obterExtratoConta = async (req, res) => {
    const { numero_conta } = req.query

    try {
        const { saques, depositos, transferencias } = await lerBancoDados()

        const depositosConta = depositos.filter(
            deposito => deposito.numero_conta === numero_conta
        )

        const saquesConta = saques.filter(saque => saque.numero_conta === numero_conta)

        const transferenciasEnviadas = transferencias.filter(
            transferencia => transferencia.numero_conta_origem === numero_conta
        )

        const transferenciasRecibidas = transferencias.filter(
            transferencia => transferencia.numero_conta_destino === numero_conta
        )

        const extrato = {
            depositos: depositosConta,
            saques: saquesConta,
            transferenciasEnviadas,
            transferenciasRecibidas
        }

        return res.status(200).json(extrato)

    } catch (erro) {
        return res.status(500).json({ mensagem: `Erro interno no servidor` })
    }

}

module.exports = {
    listarContas,
    listarContasAtivas,
    listarContasInativas,
    obterSaldoConta,
    obterExtratoConta
}



