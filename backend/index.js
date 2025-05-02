import express from "express";
import cors from "cors";
import scrapeRoutes from "./routes/routes.js";


const app = express();
const PORT = 3000 || 8080;
const PORTF = 5173

app.use(cors({
    origin: [`http://localhost:${PORTF}`, `http://127.0.0.1:${PORTF}`], // deve permitir apenas o meu frontend
    methods: ['GET'], // deve permitir apenas requisições GET
    credentials: true // deve permitir envio de cookies, se necessário
  }));

app.use("/api", scrapeRoutes);

app.get("/", (req, res) => {
  res.send("Servidor Bun com JavaScript rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORTF}`);
});
