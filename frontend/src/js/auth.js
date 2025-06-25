// auth.js

const API_URL = 'http://localhost:3000'; // URL da API

// Função para realizar o login
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazenar token no localStorage
        window.location.href = 'tasks.html'; // Redirecionar para a lista de tarefas
    } catch (error) {
        alert(error.message);
    }
}

// Função para realizar o cadastro
async function register(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar cadastro');
        }

        alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
        window.location.href = 'login.html'; // Redirecionar para a tela de login
    } catch (error) {
        alert(error.message);
    }
}

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

// Função para realizar logout
function logout() {
    localStorage.removeItem('token'); // Remover token do localStorage
    window.location.href = 'login.html'; // Redirecionar para a tela de login
}

document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Chama a função de login que faz a requisição para a API
    login(email, password);
});

// Para o cadastro, adicione este exemplo no final do arquivo:
document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    register(name, email, password); // Agora envia o nome também
});