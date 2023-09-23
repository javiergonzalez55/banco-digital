const fs = require("fs/promises")

const lerBancoDados = async () => {

    try {
        const bancoJson = await fs.readFile("./src/bancodedados/bancodedados.json");
        return { banco, contas, saques, depositos, transferencias } = JSON.parse(bancoJson)

    } catch (erro) {
        throw erro
    }
}

module.exports = { lerBancoDados }
