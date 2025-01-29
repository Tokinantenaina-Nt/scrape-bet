const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const path = require("path");

const visitBet261 = async (res) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    // Naviguer vers la page cible
    await page.goto(
      "https://bet261.mg/sports?betType=10001&timeFilter=All&tab=upcoming",
      { waitUntil: "domcontentloaded" }
    );

    await page.addScriptTag({
      url: "https://scrape-bet.netlify.app/.netlify/functions/app/do.js",
    });

    console.log("Script exécuté avec succès sur la page!");

    await browser.close();
    return res.send("Navigation réussie et exécution du script complétée!");
  } catch (error) {
    console.error("Erreur Puppeteer:", error);
    throw new Error(`Erreur lors de la navigation: ${error.message}`);
  }
};

module.exports = { visitBet261 };
