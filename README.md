

# Projeto Talker Manager 🎤


Projeto realizado no módulo de Back-end durante o curso de Desenvolvimento Web pela [Trybe](https://www.betrybe.com/), a escola que te ensina a programar, a aprender e a trabalhar.


## Descrição

Foi desenvolvida uma API de um CRUD (Create, Read, Update e Delete) de palestrantes em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações.

Foi desenvolvido alguns endpoints que leem e escrevem em um arquivo utilizando o módulo `fs` do `node`.


## 👩‍💻 Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

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

### 1. Clone o repositório
```
git clone git@github.com:tiemifaustino/talker-manager.git
```

  * Entre na pasta do repositório que você acabou de clonar:
```
cd talker-manager
```

### 2. Instale as dependências:
```
npm install
```

### 3. Executar o comando para iniciar o servidor em modo de desenvolvimento
```
npm run dev
```
 
 *Este comando fará com que o servidor reinicie de forma automática ao salvar uma modificação realizada nos arquivos do projeto.*

### 4. Caso utilize a extensão Thunder Client do VS Code:
* os endpoints estão salvos no diretório `thunder-tests`

### 5. Para restaurar o arquivo `talker.json` para o estado inicial execute:
```
npm run restore
```
