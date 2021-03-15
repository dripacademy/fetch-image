const fs = require("fs");
const puppeteer = require("puppeteer");

const env = fs.readFileSync("../.env", "utf8");
const lines = env.split(/\r?\n/);

const config = new Map();

// parse env vars
lines.forEach(l => {
    if (l.charAt(0) != "#") {
        const [key, value] = l.split("=");
        config[key] = value;
        console.log(key + ", " + value);
    }
});

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewpost({width: 1200, height: 720});
    await page.goto("https://www.instagram.com/accounts/login");

    await page.type("[name='username']", config["USERNAME"], {delay: 100});
    await page.type("[name='password']", config["PASSWORD"], {delay: 100});

    await Promise.all([
        // hopefully types enter
        await page.keyboard.type("\n"),
        page.waitForNavigation({waitUntil: "networkidle0"}),
    ]);
})

