const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIdx = repositories.findIndex(repo => repo.id === id);

  if (repoIdx < 0) {
    return response.status(400).json({ error: 'Repository ID not found' });
  }

  const { likes } = repositories[repoIdx];

  const updatedRepo = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIdx] = updatedRepo;

  return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIdx = repositories.findIndex(repo => repo.id === id);

  if (repoIdx < 0) {
    return response.status(400).json({ error: 'Repository ID not found' });
  }

  repositories.splice(repoIdx, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIdx = repositories.findIndex(repo => repo.id === id);

  if (repoIdx < 0) {
    return response.status(400).json({ error: 'Repository ID not found' });
  }

  const { title, url, techs, likes } = repositories[repoIdx];

  const updatedRepo = {
    id,
    title,
    url,
    techs,
    likes: likes + 1
  }

  repositories[repoIdx] = updatedRepo;

  return response.json(updatedRepo);
});

module.exports = app;
