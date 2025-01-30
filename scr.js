const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const visitBet261 = async (req, res) => {
  try {
    const clientIp = req.headers["x-nf-client-connection-ip"];
    console.log("Requête reçue depuis l'adresse IP :", clientIp);
    // Lancer le navigateur
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    // Capturer les erreurs de la page
    page.on("pageerror", (error) => {
      console.error("Erreur sur la page:", error);
    });

    // Naviguer vers la page cible
    console.log("Navigation vers la page cible...");
    await page.goto(
      "https://bet261.mg/sports?betType=10001&timeFilter=All&tab=upcoming",
      { waitUntil: "networkidle2" }
    );

    // Attendre que l'élément input#input-ticket soit présent dans le DOM
    console.log("Attente de l'élément input#input-ticket...");
    await page;
    // .waitForSelector(
    //   "input#input-ticket.input-betcode-ticket.ng-star-inserted",
    //   {
    //     timeout: 300000, // 5 minutes
    //   }
    // )
    // .then(() =>
    //   console.log("L'élément input#input-ticket est présent dans le DOM.")
    // )
    // .catch((error) => {
    //   console.error("Erreur lors de l'attente de l'élément:", error);
    //   throw new Error(
    //     "L'élément input#input-ticket n'a pas été trouvé dans le DOM."
    //   );
    // });

    // Injecter le script do.js depuis l'URL hébergée sur Netlify
    await page.addScriptTag({
      url: "https://scrape-bet.netlify.app/do.js",
    }); // console.log("Script do.js injecté et exécuté avec succès sur la page !");

    // Prendre un screenshot de la page
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const screenshotBase64 = screenshotBuffer.toString("base64");

    // Fermer le navigateur
    await browser.close();

    // Renvoyer une réponse

    return res.json({
      message: "Navigation réussie et exécution du script complétée !",
      Requête_ip: clientIp,
      screenshot: screenshotBase64,
    });
  } catch (error) {
    console.error("Erreur Puppeteer:", error);
    throw new Error(`Erreur lors de la navigation: ${error.message}`);
  }
};

module.exports = { visitBet261 };
