const puppeteer = require("puppeteer");

const visitBet261 = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://bet261.com", { waitUntil: "domcontentloaded" });

    // Prendre un screenshot
    await page.screenshot({ path: "screenshot.png" });

    await browser.close();
    return "Navigation réussie et capture enregistrée !";
  } catch (error) {
    console.error("Erreur Puppeteer:", error);
    throw new Error("Erreur lors de la navigation !");
  }
};

module.exports = { visitBet261 };
