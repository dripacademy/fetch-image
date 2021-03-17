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
    await ig.initialize();
    await ig.acceptCookies();
    //await ig.login(config["USERNAME"], config["PASSWORD"]);

    config["ACCOUNT_LIST"].split(",").forEach(async (username) => {
        const date = new Date();
        const filename = date.getFullYear() + "-" +
                        (date.getMonth() + 1) + "-" +
                        date.getDate() + "_" +
                        date.getHours() + "-" +
                        date.getMinutes() + "-" +
                        date.getSeconds()+"_"+username + ".json";

        const images = await ig.scrapeImages(username, 100);

        fs.writeFileSync(
            "../" + config["JSON_FILES"] + filename,
            JSON.stringify(images, null, 2)
        );
    })
})();
