# 📋 TaskFlow

![license](https://img.shields.io/badge/license-MIT-green.svg)
![feito com](https://img.shields.io/badge/feito%20com-JS%20%7C%20Node.js%20%7C%20HTML%20%7C%20CSS-9cf)

TaskFlow é um aplicativo web para gerenciamento de tarefas, pensado para ajudar você a organizar suas atividades de forma simples, visual e eficiente. Com interface intuitiva, categorização, filtros e autenticação, o TaskFlow facilita o controle do seu dia a dia acadêmico, profissional ou pessoal.

---

## 🧠 Funcionalidades

- Login e cadastro de usuários
- Adição, edição e exclusão de tarefas
- Filtros por status (pendente/concluída) e por nome
- Categorização de tarefas por tipo
- Visualização clara do status e categoria de cada tarefa
- Interface responsiva e moderna
- Restrições de adição de tarefas para PO/SC

---

## 📁 Estrutura

```
TaskFlow/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   └── src/
│       ├── index.html
│       ├── css/
│       │   └── styles.css
│       ├── js/
│       │   ├── app.js
│       │   ├── auth.js
│       │   ├── filters.js
│       │   └── tasks.js
│       ├── img/
│       │   └── TaskFlow.png
│       └── pages/
│           ├── add-task.html
│           ├── edit-task.html
│           ├── login.html
│           ├── register.html
│           └── tasks.html
└── README.md
```

---

## 🚀 Instalação e Uso

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (para backend)
- Navegador web moderno

### ▶️ Rodar o Frontend

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```
2. Acesse a pasta do frontend:
   ```sh
   cd TaskFlow/frontend
   ```
3. Abra o arquivo `src/index.html` no navegador.

### ▶️ Rodar o Backend

1. Acesse a pasta do backend:
   ```sh
   cd TaskFlow/backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor:
   ```sh
   node server.js
   ```

---

## 🛠️ Tecnologias

- **Front-end:** HTML5, CSS3, JavaScript
- **Back-end:** Node.js (Express)
- **Outros:** LocalStorage, responsividade, design moderno

---

## 🤝 Contribuição

Contribuições são super bem-vindas! Abra uma issue ou envie um pull request para sugerir melhorias, reportar bugs ou adicionar novas funcionalidades.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  Feito com 💚 por Laura Rodrigues.
</div>
