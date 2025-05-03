# Web Scraping Project

This project was developed as part of my learning process in data scraping and building web applications. The goal is to extract Amazon product data (such as title, price, image, and rating) based on a user-provided keyword. The project uses Bun.js, Axios, JSDOM, and Vanilla JavaScript for the backend and frontend, and implements an API that extracts the data efficiently.

I'm always looking to improve my skills, so any feedback on the project, code, architecture or best practices is very welcome! If you want to contribute with suggestions, you can:

- 📧 Send me an email: henrykaua21@gmail.com
- 🔗 Connect with me on [LinkedIn](https://www.linkedin.com/in/henry-kaua/)
- 🐛 Open a [issue](https://github.com/henrymzs/web-scraping/issues) aqui no repositório
- 👽 Notes on what I learned during the development of this project [Notes](./backend/Notes.md)

All help is greatly appreciated and helps me grow as a developer. 🚀

# Technologies Used
- Bun.js
- Axios
- JSDOM
- Vanilla JavaScript
- HTML/CSS
- Vite

# API Endpoints
Search for Amazon Products
GET /api/scrape/:keyword
Endpoint to search for products on Amazon, passing a keyword in the URL.
Example Request:
```
GET http://localhost:3000/api/scrape/tecnologia
```
Example Response:
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

# How to Run the Project

1. Clone the repository:

```
git clone https://github.com/henrymzs/web-scraping.git
cd your-repository-name
```

2. Start a Bun.js project and install dependencies:

```
bun install
```

3. Run the API

```
bun run dev
```

In the root of the directory type the command above, this command will run frontend and backend.

