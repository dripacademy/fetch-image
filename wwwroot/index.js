const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewpost({width: 1200, height: 720});
    await page.goto("https://www.instagram.com/accounts/login");

    await page.type("[name='username']", credentials.username, {delay: 100ms});
    await page.type("[name='password']", credentials.password, {delay: 100ms});

    await Promise.all([
        // hopefully types enter
        await page.keyboard.type("\n"),
        page.waitForNavigation({waitUntil: "networkidle0"}),
    ]);
})

