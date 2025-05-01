import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
import cors from "cors"; 

const app = express();
const PORT = 3000 || 8080;
const PORTF = 5173

app.use(cors({
    origin: [`http://localhost:${PORTF}`, `http://127.0.0.1:${PORTF}`], // deve permitir apenas o meu frontend
    methods: ['GET'], // deve permitir apenas requisições GET
    credentials: true // deve permitir envio de cookies, se necessário
  }));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


app.get("/", (req, res) => {
    res.send("Servidor Bun com JavaScript rodando!");
});

app.get('/api/scrape/:keyword', async (req, res) => {
    // extrair o parametro keyword diretamento do objeto req.params
    const { keyword } = req.params;

    try {
        const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

        const response = await axios.get(url, {
            // passando um user-agent para evitar bloqueio da amazon
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept-Language': 'pt-BR,pt;q=0.9',
            },
        });

        // instanciando jsdom de forma que seja possivel manipulação do DOM no backend
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // array que deve armazenar os dados extraidos de cada produto
        const results = [];
        // items deve conter todos os produtos listados na página da amazon
        const items = document.querySelectorAll('.s-main-slot .s-result-item');

        // deve percorrer cada produto individualmente dentro do items
        items.forEach(item => {
            // título
            const title = item.querySelector('h2.a-size-base-plus.a-color-base.a-text-normal')?.textContent.trim();
            // preço (inteiro e decimal) 
            const wholePrice = item.querySelector('.a-price-whole')?.textContent.trim();
            const fractionPrice = item.querySelector('.a-price-fraction')?.textContent.trim();
            const price = wholePrice && fractionPrice ? `${wholePrice}${fractionPrice}` : null;
            // imagem 
            const image = item.querySelector('.s-image')?.src;
            // nota
            const rating = item.querySelector('.a-icon-alt')?.textContent.trim();
            // link
            const link = item.querySelector('.a-link-normal')?.href;
            // deve adicionar o produto se os dados estiverem disponíveis
            if (title && price && image && rating) {
                results.push({
                    title,
                    price,
                    image,
                    rating,
                    link: `https://www.amazon.com.br${link}`
                });
            }
        });

        res.json({ results }); 
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

