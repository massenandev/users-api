# API de Gestão de Usuários

Serviço que consome API externa e gerencia usuários.

## Configurando o Docker

### Configurando o .env
No projeto há um arquivo chamado 
```
.env.example
```
Ele deve ser modificado (caso necessário) com as suas credenciais (usuário e senha) corretas.
### Executando o docker

```
docker-compose up -d
```

Caso não tenha em sua máquina, instale o  [docker](https://www.docker.com/)

### Conferindo se está tudo certo
```
docker ps
```

Deve-se obter, no terminal, algo similar com isto:
```          
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS                            PORTS                                           NAMES
9cc2c70db467   desafio-coodesh      "docker-entrypoint.s…"   2 minutes ago   Restarting (127) 56 seconds ago                                                   desafio-coodesh
c4466cd76bd9   mongo:4.1.8-xenial   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes                      0.0.0.0:27018->27017/tcp, :::27018->27017/tcp   db
```

### Para ver os logs do docker
```
docker-compose logs  --tail 100 -f nodejs
```

### Executando os testes de rota
```
yarn test:e2e
```

## Acessando 
```
http://localhost:3333/
```


## Visualização da documentação
```
http://localhost:3333/api-docs/
```

# Techs utilizadas:
- NodeJS;
- Docker;
- MongoDB como banco de dados;
- Mongoose para conexão com o banco de dados;
- Jest para testes de rota;
- Swagger para documentação da API;
- Axios para consumir API externa;
- Node-cron para agendar inserção de dados no banco de dados.
