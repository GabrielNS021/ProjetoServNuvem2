import express from 'express';

const app = express();
app.use(express.json());

let filmes = [
  { id: 1, titulo: "Matrix", diretor: "Wachowskis", ano: 1999, genero: "Ficção Científica" },
  { id: 2, titulo: "Interestelar", diretor: "Christopher Nolan", ano: 2014, genero: "Ficção Científica" },
  { id: 3, titulo: "Parasita", diretor: "Bong Joon-ho", ano: 2019, genero: "Suspense" },
  { id: 4, titulo: "O Poderoso Chefão", diretor: "Francis Ford Coppola", ano: 1972, genero: "Crime" },
  { id: 5, titulo: "Pulp Fiction", diretor: "Quentin Tarantino", ano: 1994, genero: "Crime" },
  { id: 6, titulo: "A Origem", diretor: "Christopher Nolan", ano: 2010, genero: "Ficção Científica" },
  { id: 7, titulo: "O Senhor dos Anéis: O Retorno do Rei", diretor: "Peter Jackson", ano: 2003, genero: "Fantasia" },
  { id: 8, titulo: "Forrest Gump", diretor: "Robert Zemeckis", ano: 1994, genero: "Comédia Dramática" },
  { id: 9, titulo: "Gladiador", diretor: "Ridley Scott", ano: 2000, genero: "Ação" },
  { id: 10, titulo: "Cidade de Deus", diretor: "Fernando Meirelles", ano: 2002, genero: "Crime" }
];
let nextId = 11;

app.get('/filmes', (_, res) => {
  res.json(filmes);
});

app.get('/filmes/:id', (req, res) => {
  const idFilme = parseInt(req.params.id, 10);
  const filme = filmes.find(f => f.id === idFilme);

  if (filme) {
    res.json(filme);
  } else {
    res.status(404).json({ message: 'Filme não encontrado.' });
  }
});

app.post('/filmes', (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'O campo "titulo" é obrigatório.' });
  }

  const novoFilme = {
    id: nextId++,
    titulo,
    diretor: diretor || null,
    ano: ano || null,
    genero: genero || null
  };

  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.put('/filmes/:id', (req, res) => {
  const idFilme = parseInt(req.params.id, 10);
  const { titulo, diretor, ano, genero } = req.body;
  const indexFilme = filmes.findIndex(f => f.id === idFilme);

  if (indexFilme === -1) {
    return res.status(404).json({ message: 'Filme não encontrado.' });
  }

  if (!titulo) {
    return res.status(400).json({ message: 'O campo "titulo" é obrigatório para atualização.' });
  }

  const filmeAtualizado = {
    id: idFilme,
    titulo,
    diretor: diretor !== undefined ? diretor : filmes[indexFilme].diretor,
    ano: ano !== undefined ? ano : filmes[indexFilme].ano,
    genero: genero !== undefined ? genero : filmes[indexFilme].genero
  };

  filmes[indexFilme] = filmeAtualizado;
  res.json(filmeAtualizado);
});

app.delete('/filmes/:id', (req, res) => {
  const idFilme = parseInt(req.params.id, 10);
  const tamanhoOriginal = filmes.length;
  filmes = filmes.filter(f => f.id !== idFilme);

  if (filmes.length < tamanhoOriginal) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Filme não encontrado.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de Catálogo de Filmes rodando na porta ${PORT}`);
});