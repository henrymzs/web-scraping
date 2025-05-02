import express from 'express';
import { scrapeProducts } from "../controllers/scrapeController";

const router = express.Router();

router.get('/scrape/:keyword', scrapeProducts);

export default router;