const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const { sequelize, Chamado } = require('../models');

const app = express();

// Middleware para habilitar CORS
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Permitir requisições do frontend
console.log(`CORS configurado para: ${frontendUrl}`);  // Log para depuração do CORS

app.use(cors({
  origin: frontendUrl, // Permitir requisições do frontend
}));

// Middleware para processar o corpo das requisições
app.use(express.json());

// Rota de verificação de conexão com o banco
app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate(); // Verifica a conexão com o banco
    res.send('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    res.status(500).send('Não foi possível conectar ao banco de dados: ' + error.message);
  }
});

// Rota para criar um novo chamado
app.post('/chamados', async (req, res) => {
  console.log('Dados recebidos:', req.body);  // Log de depuração para verificar os dados recebidos

  const { descricao, tipo, status } = req.body;

  // Verificação de campos obrigatórios
  if (!descricao || !tipo) {
    return res.status(400).send('Descrição e tipo são obrigatórios.');
  }

  try {
    const novoChamado = await Chamado.create({
      descricao,
      tipo,
      status: status || 'Aberto',
    });
    res.status(201).json(novoChamado);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);  // Log de erro
    res.status(500).send('Erro ao criar chamado: ' + error.message);
  }
});

// Rota para listar todos os chamados
app.get('/chamados', async (req, res) => {
  try {
    const chamados = await Chamado.findAll(); // Busca todos os chamados
    res.json(chamados);
  } catch (error) {
    console.error('Erro ao listar chamados:', error);  // Log de erro
    res.status(500).send('Erro ao listar chamados: ' + error.message);
  }
});

// Rota para atualizar um chamado existente
app.put('/chamados/:id', async (req, res) => {
  const { id } = req.params; // Obtém o ID do chamado na URL
  const { descricao, tipo, status } = req.body; // Obtém os dados enviados no corpo da requisição

  try {
    // Busca o chamado pelo ID
    const chamado = await Chamado.findByPk(id);

    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    // Atualiza os campos do chamado, se forem enviados
    chamado.descricao = descricao || chamado.descricao;
    chamado.tipo = tipo || chamado.tipo;
    chamado.status = status || chamado.status;

    // Salva as alterações no banco de dados
    await chamado.save();

    res.status(200).json({ message: 'Chamado atualizado com sucesso!', chamado });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error); // Log de erro
    res.status(500).json({ message: 'Erro ao atualizar chamado: ' + error.message });
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Tenta sincronizar o banco de dados
  try {
    await sequelize.sync({ alter: true }); // Sincroniza os modelos com o banco de dados
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
});
