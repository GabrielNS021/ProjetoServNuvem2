# Projeto Integrador – Cloud Developing 2025/1

> CRUD simples + API Gateway + Lambda /report + RDS + CI/CD

**Grupo**:

1. 10403348 - Gabriel Neman Silva - responsabilidade
2. 10376918 - Ricardo Carvalho Paixão Brandão - responsabilidade
3. 10419046 - Gabriel Pastorelli de Almeida - responsabilidade

## 1. Visão geral
O domínio escolhido para este projeto é um Catálogo de Filmes, projetada para gerenciar uma coleção de informações sobre filmes, como título, diretor, ano de lançamento e gênero.

O CRUD implementado nesta API permite realizar as seguintes ações sobre os dados dos filmes:
*Create: Permite adicionar um novo registro de filme ao catálogo, fornecendo seus detalhes no corpo da requisição.
*Read: Possibilita consultar a lista completa de filmes existentes no catálogo ou obter os detalhes de um filme específico através do seu identificador único (ID).
*Update: Permite modificar as informações de um filme já existente no catálogo, identificado pelo seu ID.
*Delete: Permite remover um registro de filme específico do catálogo, utilizando seu ID.

## 2. Arquitetura

![Diagrama](docs/arquitetura.png)

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Backend | ECS Fargate (ou EC2 + Docker) | API REST Node/Spring/… |
| Banco   | Amazon RDS              | PostgreSQL / MySQL em subnet privada |
| Gateway | Amazon API Gateway      | Rotas CRUD → ECS · `/report` → Lambda |
| Função  | AWS Lambda              | Consome a API, gera estatísticas JSON |
| CI/CD   | CodePipeline + GitHub   | push → build → ECR → deploy |

## 3. Como rodar localmente

```bash
cp .env.example .env         # configure variáveis
docker compose up --build
# API em http://localhost:3000