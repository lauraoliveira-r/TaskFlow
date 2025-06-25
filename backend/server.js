const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB (ajuste a string se usar Atlas ou outro host)
mongoose.connect('mongodb://localhost:27017/taskflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Defina o schema da tarefa
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: String,
    category: String,
    status: { type: String, default: 'pending' }
});

const Task = mongoose.model('Task', taskSchema);

let users = []; // Armazena usuários em memória
let taskIdCounter = 0;

// Rota de cadastro
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    users.push({ name, email, password });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }
    // Token fake só para simular autenticação
    res.json({ token: 'fake-jwt-token', name: user.name });
});

// Listar tarefas
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    // Mapeia cada tarefa para trocar _id por id
    const tasksWithId = tasks.map(task => ({
        id: task._id.toString(), // Garante que o campo id existe e é string
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
        status: task.status
    }));
    res.json(tasksWithId);
});

// Adicionar tarefa
app.post('/tasks', async (req, res) => {
    const { title, description, dueDate, category } = req.body;
    const task = new Task({ title, description, dueDate, category });
    await task.save();
    res.status(201).json(task);
});

// Editar tarefa
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});

// Excluir tarefa
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
});

// Obter tarefa por ID
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    console.log('Recebido GET /tasks/:id com id:', id); 
    Task.findById(id)
        .then(task => {
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Tarefa não encontrada' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
});

app.use((req, res) => {
  res.status(404).send('Rota não encontrada');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});