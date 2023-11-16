# Projeto: Operações básicas do sistema bancario

**SOBRE:**

Trata-se de uma API RESTful para gerenciamento de contas bancarias, implementando as funcionalidades CRUD, tanto para a manipulação dos recursos de cada conta quanto a execução das transacões: consulta de saldo, depositos, saques e transferências. O projeto foi desenvolvido com NodeJs JavaScript, destacando o uso do conceito de soft delete, implementando a inativação e arquivo de contas sem serem de fato excluidas, para permitir a recuperação de dados e inclusive a reativação do cliente no sistema.

**CARACTERISTICAS:**

- A implementação do conceito de soft delete para desativar as contas, sem precisar exclui-las
- O uso do arquivo bancodedados.json para persistir os dados na memoria do sistema usando a biblioteca nativa de JavaScript fs/promise para facilitar a leitura e escrita desse arquivo de dados
- A organização do servidor separando controladores e roteadores (contas e transações) para permitir uma melhor compreensão do codigo na hora de revisar ou refatorar

**FERRAMENTAS USADAS:**

   * ![Nodejs](https://img.shields.io/badge/Node%20js-339933?style=style=for-the-badge&logo=nodedotjs&logoColor=white) 

   * ![JavaScript](https://img.shields.io/badge/JavaScript-008B8B?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 

   * ![SQL](https://img.shields.io/badge/MySQL-8B0000?style=for-the-badge&logo=mysql&logoColor=white)

   * ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000080?style=for-the-badge&logo=postgresql&logoColor=white)

   * Ferramentas GIT

   * GitHub
     

**REQUERIMENTOS:**

* Ferramentas:
  * vscode
  * nodejs
  * git
 
* Pacotes NPM:
  * express
  * date-fns
  * nodemon
  * fs/promise

* Plataforma:
  * GitHub 

**COMO INSTALAR:**

* Fazer um fork do repositorio [BancoDigital](https://github.com/javiergonzalez55/banco-digital)

* Clonar o repositorio se atentando em qual dos 3 metodos (chaves HTTPS - SSH - GitHub CLI) foi executado para a configuração da sua máquina

* Conferir que seu repositorio local está se executando na branch master

* Na raiz do seu repositorio local, executar o comando: npm i, para instalar os pacotes implementados no sistema. Confira-se os pacotes dentro do package.json

* Iniciar o servidor executando o comando: npm run dev 

* Para requisitar o sistema através do cliente http: 
- Verificar qual o metodo rest (get, post, put, patch, delete) usado na rota que vai ser requistada
- Usar a url http://localhost:3000 para chamar a rota correspondente

* Fazer as suas alterações no codigo, testar e salvar. Na sequencia, dar commit e subir as suas alterações

As suas contribuções são sempre muito bem vindas!!!



**EM DESTAQUE:**










