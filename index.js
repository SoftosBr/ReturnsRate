import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function scraper() {
  const url = "https://news.ycombinator.com/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const html = await page.content();
  const $ = cheerio.load(html);
  browser.close;
  const titles = [];

  $(".titleline > a").each((_, el) => {
    const title = $(el).text();
    const link = $(el).attr("href");
    titles.push({title, link});
  });

  console.log("Found:\n", titles);
  return;
}

scraper();
