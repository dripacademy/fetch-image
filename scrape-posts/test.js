const puppeteer = require("puppeteer");
const ig = require("./instagram");

(async () => {
    await ig.initialize();
    await ig.acceptCookies();
    const links = await ig.scrapePostLinks("jesus.nr1", 10);
    console.log(links);
})();
