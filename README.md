## Back-end com NodeJS

Nesse projeto foi desenvolvido um back-end simples que recebe requisiçes HTTP através do http://localhost:3333/ e salva os dados em um array do próprio código.

*para rodar esse projeto, instale as libs com o comando **yarn** e rode o projeto com o comando **yarn dev***

As requisições aceitas são:

+ **GET** (/projects) para **listar** todos os projetos salvos.

  + A resposta é dada em uma lista de projetos. Como abaixo:
```JSON
[
  {
    "id": "13d4bdd2-5180-48e1-a0ae-f15642bafb20",
    "title": "Back-end com NodeJS",
    "owner": "Rubens Guimarães"
  },
  {
    "id": "9c0274b1-34c3-483d-aba0-4496b40429e9",
    "title": "Front-end com ReactJS",
    "owner": "Rubens Guimarães"
  },
  {
    "id": "1c91b467-4bb2-4709-84c1-0977d9d4ce8a",
    "title": "Aplicativo React Native",
    "owner": "Rubens Guimarães"
  }
]
```


+ **POST** (/projects) para **criar** um novo projeto.

  + Deve-se enviar os dados no corpo da requisição. Como abaixo:

```JSON
{
	"title": "Projeto 1",
	"owner": "Rubens"
}
```

+ **PUT** (/projects/valor_do_id) para **editar** um projeto existente.

  + Deve-se enviar os dados a serem editador no corpo da requisição. Como abaixo:

```JSON
{
	"title": "Projeto 1",
	"owner": "Rubens"
}
```


+ **DELETE** (/projects/valor_do_id) para **deletar** um projeto existente.

  + Nessa requisição não há nada no corpo, apenas o ID como parametro na URL.


* Nesse projeto também foi desenvolvido uma Middleware para validar o ID do projeto como UUID quando é feito alguma solicitação com parametro de ID.

