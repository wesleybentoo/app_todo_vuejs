# **To-Do List - Frontend**

**Autor:** Wesley Bento  
**Descrição:** Este é o frontend da aplicação **To-Do List**, desenvolvido em **Vue.js** para gerenciar tarefas, subtarefas, categorias e status. Este projeto se comunica com uma API backend para fornecer funcionalidades completas de CRUD.

---

## **Índice**
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Requisitos do Projeto](#requisitos-do-projeto)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Scripts Disponíveis](#scripts-disponíveis)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Boas Práticas de Desenvolvimento](#boas-práticas-de-desenvolvimento)
8. [Contribuição](#contribuição)
9. [Licença](#licença)

---

## **Sobre o Projeto**

O objetivo deste projeto é fornecer uma interface intuitiva e responsiva para que os usuários possam:
- Criar, visualizar, atualizar e excluir tarefas e subtarefas.
- Organizar tarefas por categorias e status.
- Gerenciar contas de usuário, incluindo autenticação e autorização.

---

## **Tecnologias Utilizadas**

- **Vue.js 3**: Framework progressivo para construção de interfaces de usuário.
- **Quasar Framework**: Biblioteca de componentes para criação de UIs modernas e responsivas.
- **Axios**: Cliente HTTP para comunicação com a API.
- **Pinia**: Gerenciador de estado simples e flexível.
- **Vue Router**: Para navegação entre páginas.
- **Vite**: Ferramenta para desenvolvimento e build de projetos Vue.js.

---

## **Requisitos do Projeto**

- **Node.js**: Versão 16.x ou superior.
- **NPM**: Versão 8.x ou superior (ou Yarn, se preferir).
- **API ToDo**: https://github.com/wesleybentoo/api_todo.git

---

## **Instalação e Configuração**

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório:**  
   ```bash
   git clone <https://github.com/wesleybentoo/app_todo_vuejs.git>
   cd <nome-do-repositório>

2. **Instale as dependências:**  
   npm install


3. **Configuração de ambiente:**
- **Crie** um arquivo .ENV
  VITE_API_BASE_URL=http://127.0.0.1:8000/api
- Copie o link da API ToDo que ja esta configurada e rodando em sua máquina

4. **Inicie o servidor:**
   quasar dev   


5. **Acesse a aplicação no navegador:**
   http://localhost:5173

---

## **Scripts Disponíveis**

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera os arquivos otimizados para produção.
- **`npm run preview`**: Visualiza a aplicação em modo de produção.
- **`npm run lint`**: Executa o linter para verificar problemas no código.
- **`quasar dev`**: Inicia o servidor de desenvolvimento utilizando o Quasar Framework.
- **`quasar build`**: Gera os arquivos otimizados para produção com o Quasar Framework.

---

## **Estrutura do Projeto**

    ```plaintext
    src/
    ├── assets/             # Arquivos estáticos como imagens e estilos globais
    ├── components/         # Componentes reutilizáveis
    ├── layouts/            # Layouts gerais da aplicação
    ├── pages/              # Páginas completas
    ├── router/             # Configuração de rotas
    ├── stores/             # Gerenciamento de estado (Pinia)
    ├── utils/              # Funções auxiliares e utilitários
    ├── App.vue             # Componente raiz da aplicação
    ├── main.js             # Ponto de entrada principal
    └── env/                # Configurações de ambiente

---
## **Boas Práticas de Desenvolvimento**

1. **Componentização:**  
   Divida a interface em componentes reutilizáveis para facilitar o desenvolvimento e a manutenção.

2. **Estado Global:**  
   Utilize o **Pinia** para gerenciar estados compartilhados entre componentes.

3. **Boas Práticas de Código:**
    - Sempre execute **linting** (`npm run lint`) antes de realizar um commit para manter o código consistente.
    - Use convenções de nomenclatura consistentes:
        - **PascalCase** para nomes de componentes.
        - **kebab-case** para arquivos e pastas.
    - Adicione comentários explicativos em trechos de código complexos.

4. **Gerenciamento de Rotas:**
    - Proteja rotas sensíveis usando o **Vue Router** com middleware de autenticação.
    - Configure `beforeEach` para verificar tokens ou permissões do usuário antes de carregar rotas protegidas.
    - Use nomes consistentes para as rotas no arquivo de configuração (`router/index.js`).

5. **Comunicação com a API:**
    - Configure uma instância base do **Axios** em `src/utils/axios.js` com:
        - **Base URL**: Definida no arquivo `.env` para facilitar alterações futuras.
        - **Interceptors**: Para adicionar automaticamente tokens de autenticação nas requisições.
    - Sempre trate erros retornados pela API e exiba mensagens úteis para o usuário.

6. **Estilização:**
    - Utilize o **Quasar Framework** para componentes e estilos consistentes.
    - Mantenha o estilo global em um único arquivo (`src/assets/styles.css`).
    - Prefira classes CSS padronizadas para evitar conflitos.

7. **Performance:**
    - Implemente carregamento assíncrono de componentes utilizando a função `defineAsyncComponent` do Vue.
    - Utilize **lazy loading** em rotas para carregar apenas os componentes necessários no momento certo.
    - Minimize re-renderizações utilizando o sistema de reatividade do Vue corretamente (ex.: `ref`, `computed`).

8. **Testes:**
    - Adicione testes unitários para componentes principais utilizando ferramentas como **Vitest** ou **Jest**.
    - Realize testes de integração para garantir a consistência entre o frontend e a API.

9. **Versionamento:**
    - Trabalhe sempre em branches específicas (`feature/nome-da-feature`, `bugfix/nome-do-bug`).
    - Adote mensagens de commit descritivas (ex.: `"Adiciona componente de tabela para listagem de tarefas"`).
    - Faça **Pull Requests** somente após revisão e validação do código.  
