

# Projeto Talker Manager 🎤


Projeto realizado no módulo de Back-end durante o curso de Desenvolvimento Web pela [Trybe](https://www.betrybe.com/), a escola que te ensina a programar, a aprender e a trabalhar.


## Descrição

Foi desenvolvida uma API de um CRUD (Create, Read, Update e Delete) de palestrantes em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações.

Foi desenvolvido alguns endpoints que leem e escrevem em um arquivo utilizando o módulo `fs` do `node`.


## 👩‍💻 Tecnologias Utilizadas

- Node.js <img align="center" alt="Tiemi-Node.js" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
          
- Express <img align="center" alt="Tiemi-Express" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
          
- MySQL <img align="center" alt="Tiemi-MySQL" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />

- Nodemon

- Thunder Client


## 🛠️ Habilidades Utilizadas

- Criar endpoints;
- Utilizar o módulo `fs` de leitura e escrita;
- Criar uma API de um CRUD (Create, Read, Update e Delete);
- Criar middlewares e validações.


## 📂 Arquivos desenvolvidos

- Caminho `./middlewares`
    - Todos os middlewares presentes nesta pasta

- Arquivo `index.js` onde estão as rotas (endpoints)


## 🗄️ Fornecido pela [Trybe](https://www.betrybe.com/)

- Arquivo `talker.json`


## Instalando Dependências

1. Clone o repositório
  * `git clone git@github.com:tiemifaustino/talker-manager.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd talker-manager`

2. Instale as dependências:
  * `npm install`

3. Executar o comando para iniciar o servidor em modo de desenvolvimento
  * `npm run dev`
 
 *Este comando fará com que o servidor reinicie de forma automática ao salvar uma modificação realizada nos arquivos do projeto.*

4. Caso utilize a extensão Thunder Client do VS Code, os endpoints estão salvos no diretório `thunder-tests`

5. Para restaurar o arquivo `talker.json` para o estado inicial execute:
  * `npm run restore`
