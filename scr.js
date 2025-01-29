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

    // Attendre que l'élément input#input-ticket soit présent dans le DOM
    await page;
    await page
      .waitForFunction(
        () =>
          document.querySelector(
            "input#input-ticket.input-betcode-ticket.ng-star-inserted"
          ) !== null,
        { timeout: 180000 }
      )
      .then(() =>
        console.log("L'élément input#input-ticket est présent dans le DOM.")
      )
      .catch(() => {
        throw new Error(
          "L'élément input#input-ticket n'a pas été trouvé dans le DOM."
        );
      });

    // Injecter le script do.js depuis l'URL hébergée sur Netlify
    await page.addScriptTag({
      url: "https://scrape-bet.netlify.app/do.js",
    });

    console.log("Script do.js injecté et exécuté avec succès sur la page !");

    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const screenshotBase64 = screenshotBuffer.toString("base64");

    await browser.close();

    // Renvoyer une réponse
    return res.json({
      message: "Navigation réussie et exécution du script complétée !",
      screenshot: screenshotBase64,
    });
  } catch (error) {
    console.error("Erreur Puppeteer:", error);
    throw new Error(`Erreur lors de la navigation: ${error.message}`);
  }
};

module.exports = { visitBet261 };
