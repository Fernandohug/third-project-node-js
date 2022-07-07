/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware:
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /projects/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/usuarios/:id', validatusuarioId);

const usuarios = [];

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validatusuarioId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalidusuario ID. (Middleware)' }));

  return next();

}

// Listagem de projetos
app.get('/usuarios', (request, response) => {
  const { name, email } = request.query;

  // Filtro (Query inserida no insomnia) por title
  results = name ?
   usuarios.filter(usuario =>usuario.name.includes(name)) :
    usuarios;

  // Filtro (Query inserida no insomnia) por owner
  results = email ?
    results.filter(usuario =>usuario.email.includes(email)) :
    results;

  return response.json(results);
});

// Inclusão de projetos
app.post('/usuarios', (request, response) => {
  const { name, email } = request.body;
  const id = uuid();

  const usuario = { id, name, email };
 usuarios.push(usuario);

  return response.json(usuario);
});

// Alteração de projetos
app.put('/usuarios/:id', validatusuarioId, (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);

  if (usuarioIndex < 0) {
    return response.status(400).json({ error: 'usuarios not Found'});
  }
  

  const usuario = { id, name, email };

 usuarios[usuarioIndex] = usuario;

  return response.json(usuario);
});

// Deleção de projetos
app.delete('/usuarios/:id', validatusuarioId, (request, response) => {
  const { id } = request.params;

  usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);

  if (usuarioIndex < 0) {
    return response.status(400).json({ error: 'usuario not Found'});
  }

 usuarios.splice(usuarioIndex, 1);

  return response.json({ 'delete': 'Successfully' });

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});