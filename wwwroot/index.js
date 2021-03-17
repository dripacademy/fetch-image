const fs = require("fs");
const puppeteer = require("puppeteer");
const ig = require("./instagram");

const env = fs.readFileSync("../.env", "utf8");
const lines = env.split(/\r?\n/);

const config = new Map();

// parse env vars
lines.forEach(l => {
    if (l.charAt(0) != "#") {
        const [key, value] = l.split("=");
        config[key] = value;
    }
});

(async () => {
    const ig = await instagram.initialize();

    await page.waitForSelector("[placeholder='Search']", { state: "visible" });

    // jesus.nr1 placeholder accountUrl
    let imgs = await ScrapeImages(page, "https://www.instagram.com/jesus.nr1", 20);

    console.log(imgs);
})();
