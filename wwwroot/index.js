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
    }
});

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});

    try {
        await page.goto("https://www.instagram.com/accounts/login", {waitUntil: "networkidle2"});

        const [button] = await page.$x("//button[contains(., 'Accept')]");
        if (button) {
            await button.click();
        }
    } catch(error) {
        console.error(error)
    }

    //LogIn(page, config["USERNAME"], config["PASSWORD"]);

    await page.waitForSelector("[placeholder='Search']", { state: "visible" });

    // jesus.nr1 placeholder accountUrl
    let imgs = await ScrapeImages(page, "https://www.instagram.com/jesus.nr1", 20);

    console.log(imgs);

    // no longer needed
    await browser.disconnect();
})();

async function LogIn(page, username, password) {
    try {
        await page.type("[name='username']", username, {delay: 207});
        await page.type("[name='password']", password, {delay: 430});
        await page.click("[type='submit']", {delay: 1374});
        await page.waitForSelector("[placeholder='Search']", { state: "visible" });
        console.log("logged in!");
    } catch(error) {
        console.error(error)
    }
}

async function ScrapeImages(page, accountUrl, maxItemCount) {
    var page = this.page
    let previousHeight
    var media = new Set()

    await page.goto(accountUrl);

    while (maxItemCount == null || media.size < maxItemCount) {
        try {
            previousHeight = await page.evaluate(`document.body.scrollHeight`)
            await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
            await page.waitFor(1000)

            const nodes = await page.evaluate(() => {
                const images = document.querySelectorAll(`a > div > div.KL4Bh > img`)
                return [].map.call(images, img => img.src)
            })

            nodes.forEach(element => {
                if (media.size < maxItemCount) {
                    media.add(element)
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    return media
}
