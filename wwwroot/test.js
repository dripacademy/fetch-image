const puppeteer = require("puppeteer");
const ig = require("./instagram");

(async () => {
    await ig.initialize();
    await ig.acceptCookies();
})();
