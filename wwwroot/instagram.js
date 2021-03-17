const puppeteer = require("puppeteer");

const instagram = {
    broser: null,
    page: null,

    initialize: async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });

        const page = await browser.newPage();
        await page.setViewport({width: 1200, height: 720});

        await page.goto("https://www.instagram.com", {waitUntil: "networkidle2"});
    },

    login: async(username, password) => {
        await page.goto("https://www.instagram.com/accounts/login", {waitUntil: "networkidle2"});

        const [button] = await page.$x("//button[contains(., 'Accept')]");
        if (button) {
            await button.click();
        }

        await page.type("[name='username']", username, {delay: 300});
        await page.type("[name='password']", password, {delay: 300});
        await page.click("[type='submit']", {delay: 500});
        // wait for 5 seconds, to finish loading
        await page.waitFor(5000);
        //await page.waitForSelector("[placeholder='Search']", { state: "visible" });
    },

    scrapeImages: async (username, maxItemCount) => {
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
}

module.exports = [instagram];
