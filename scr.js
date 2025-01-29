const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const visitBet261 = async (res) => {
  try {
    // Lancer le navigateur
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

    // Injecter le script do.js depuis l'URL hébergée sur Netlify
    await page.addScriptTag({
      url: "https://scrape-bet.netlify.app/do.js",
    });

    console.log("Script do.js injecté et exécuté avec succès sur la page !");

    // Fermer le navigateur
    await browser.close();

    // Renvoyer une réponse
    return res.send("Navigation réussie et exécution du script complétée !");
  } catch (error) {
    console.error("Erreur Puppeteer:", error);
    throw new Error(`Erreur lors de la navigation: ${error.message}`);
  }
};

module.exports = { visitBet261 };
