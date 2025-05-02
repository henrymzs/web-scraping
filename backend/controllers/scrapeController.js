import axios from "axios";
import { JSDOM } from "jsdom";

export const scrapeProducts = async (req, res) => {
  const { keyword } = req.params;

  try {
    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const results = [];

    const items = document.querySelectorAll(".s-main-slot .s-result-item");

    items.forEach((item) => {
      const title = item.querySelector("h2.a-size-base-plus.a-color-base.a-text-normal")?.textContent.trim();
      const wholePrice = item.querySelector(".a-price-whole")?.textContent.trim();
      const fractionPrice = item.querySelector(".a-price-fraction")?.textContent.trim();
      const price = wholePrice && fractionPrice ? `${wholePrice}${fractionPrice}` : null;
      const image = item.querySelector(".s-image")?.src;
      const rating = item.querySelector(".a-icon-alt")?.textContent.trim();
      const link = item.querySelector(".a-link-normal")?.href;

      if (title && price && image && rating) {
        results.push({
          title,
          price,
          image,
          rating,
          link: `https://www.amazon.com.br${link}`,
        });
      }
    });

    res.json({ results });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};
