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
    const browser = await puppeteer.launch({
        args: {
            "--incognito',
        },
        headless: false,
    );

    const page = await browser.newPage();
    await page.setViewpost({width: 1200, height: 720});
    await page.goto("https://www.instagram.com/accounts/login");

    Authenticate(page, config["USERNAME"], config["PASSWORD"]);

    // jesus.nr1 placeholder accountUrl
    await ScrapeImages(page, "https://www.instagram.com/jesus.nr1");
})

async function Authenticate(page, username, password) {
    await page.type("[name='username']", username, {delay: 100});
    await page.type("[name='password']", password, {delay: 100});
    await page.click("[type='submit']");
    page.waitForSelector("[placeholder='Search']", { state: "visible" });

    /*await Promise.all([
        // hopefully types enter
        await page.keyboard.type("\n"),
        page.waitForNavigation({waitUntil: "networkidle0"}),
    ]);*/
}

async function ScrapeImages(page, accountUrl) {
    await page.goto(accountUrl);

}

