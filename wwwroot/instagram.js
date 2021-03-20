const puppeteer = require("puppeteer");

const instagram = {
    browser: null,
    page: null,
    baseUrl: "https://www.instagram.com/",

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false,
            args: [
                "--lang=en",
            ]
        });

        instagram.page = await instagram.browser.newPage();
        await instagram.page.setViewport({width: 1200, height: 720});

        await instagram.page.goto(instagram.baseUrl, {waitUntil: "networkidle2"});
    },

    acceptCookies: async() => {
        const [button] = await instagram.page.$x("//button[contains(., 'Accept')]");
        if (button) {
            await button.click();
        }
    },

    login: async(username, password) => {
        await instagram.page.goto(instagram.baseUrl+"accounts/login", {waitUntil: "networkidle2"});

        await instagram.page.type("[name='username']", username, {delay: 300});
        await instagram.page.type("[name='password']", password, {delay: 300});
        //await instagram.page.click("[type='submit']", {delay: 500});
        // wait for 5 seconds, to finish loading
        //await instagram.page.waitFor(5000);

        await Promise.all([
            await instagram.page.click("[type='submit']", {delay: 500}),
            await instagram.page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
    },

    scrapeImages: async (username, maxItemCount) => {
        let previousHeight
        var media = new Set()

        await instagram.page.goto(instagram.baseUrl+username);

        while (maxItemCount == null || media.size < maxItemCount) {
            try {
                previousHeight = await instagram.page.evaluate(`document.body.scrollHeight`)
                await instagram.page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
                await instagram.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
                await instagram.page.waitFor(1000)

                const nodes = await instagram.page.evaluate(() => {
                    /*const post = document.querySelectorAll(`article > div > div > div > div > a`);
                    console.log(link);*/
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

module.exports = instagram;
