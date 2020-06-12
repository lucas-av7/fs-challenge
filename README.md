# AV7 Movies
Procure por filmes e séries e tenha detalhes como: Enredo, elenco, direção, nota e mais!
Veja online: [Heroku](https://av7-movies-front.herokuapp.com/).

## Tecnologias usadas

### Frontend
- **ReactJS**
- Axios

### Backend
- **NodeJS**
- Express
- Axios
- Cors
- Dotenv

## Como Iniciar o projeto
Primeiro, renomeie o arquivo *.env.example*, dentro da pasta **backend**, para apenas *.env*, em seguida adiciona a chave de acesso a api disponibilizada pela [OMDB](http://www.omdbapi.com/apikey.aspx):
```
# Chave para ter acesso a API (http://www.omdbapi.com/)
IMDB_API_KEY=
``` 

*É preciso ter instalado o [NodeJS](https://nodejs.org/en/download/) e [Yarn](https://classic.yarnpkg.com/en/docs/install/) para continuar.*

Faça o download das dependências e rode o projeto executando os códigos abaixo a partir da pasta raíz.
- Backend
```
$ cd backend
$ npm install
$ npm start
```

- Frontend
```
$ cd frontend
$ yarn install
$ yarn start
```

**A partir deste momento, a aplicação estará disponível para acesso no link *http://localhost:3000*, com a aplicação backend utilizando a porta *3007*.**