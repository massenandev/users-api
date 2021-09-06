# API de Gestão de Usuários

Serviço que consome API externa e gerencia usuários.

## Configurando o Docker
### Executando o docker

```
docker-compose up
```

Caso não tenha em sua máquina, instale o  [docker](https://www.docker.com/)

### Conferindo se está tudo certo
```
docker ps
```

### Executando os testes de rota
```
yarn test:e2e
```

## Acessando 
```
http://localhost:3333
```


## Visualização da documentação
```
http://localhost:3333/api-docs/
```