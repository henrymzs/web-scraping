# Projeto de Scraping de Produtos da Amazon

Este projeto foi desenvolvido como parte do meu aprendizado em scraping de dados e construção de aplicações web. O objetivo é realizar a extração de dados de produtos da Amazon (como título, preço, imagem e classificação) com base em uma palavra-chave fornecida pelo usuário. O projeto utiliza Bun.js, Axios, JSDOM, e Vanilla JavaScript para o back-end e front-end, com a implementação de uma API que extrai os dados de forma eficiente.

Estou sempre em busca de aprimorar minhas habilidades, então qualquer feedback sobre o projeto, código, arquitetura ou boas práticas será muito bem-vindo! Se quiser contribuir com sugestões, você pode:

- 📧 Me enviar um e-mail: henrykaua21@gmail.com
- 🔗 Se conectar comigo no [LinkedIn](https://www.linkedin.com/in/henry-kaua/)
- 🐛 Abrir uma [issue](https://github.com/henrymzs/web-scraping/issues) aqui no repositório
- 👽 Notas do que aprendi durante o desenvolvimento desse projeto [Notes](./backend/Notes.md)

Toda ajuda é muito apreciada e me auxilia a crescer como desenvolvedor. 🚀

# Tecnologias Utilizadas 
- Bun.js
- Axios
- JSDOM
- Vanilla JavaScript
- HTML/CSS
- Vite

# Endpoints da API
Buscar Produtos da Amazon
GET /api/scrape/:keyword
Endpoint para realizar a busca de produtos na Amazon, passando uma palavra-chave na URL.
Exemplo de Requisição:
```
GET http://localhost:3000/api/scrape/iphone
```
Exemplo de Resposta:
```
{
	"results": [
		{
			"title": "Tecnologias e ciências da linguagem: vertentes e novas aplicações (volume 1)",
			"price": "0,00",
			"image": "https://m.media-amazon.com/images/I/81YPwea8fxL._AC_UL320_.jpg",
			"rating": "4,4 de 5 estrelas",
			"link": "https://www.amazon.com.br/keyword-etc...."
		},
    ]
}
```

# Como Executar o Projeto

1. Clone o repositório:

```
git clone https://github.com/henrymzs/web-scraping.git
cd nome-do-seu-repositorio
```

2. Inicie um projeto Bun.js e Instale as dependências:

```
bun install
```

3. Configure o arquivo .env com suas credenciais do banco de dados:

```
PORT = Porta do backend
PORTF = porta do frontend
```

4. Execute a API

```
na raiz do diretório digite bun run dev, esse comando irá rodar frontend e backend
atenção, olhe a porta que o frontend esta rodando, coloque essa porta no PORTF para que funcione perfeitamente o código
```
