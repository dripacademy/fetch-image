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
    await ig.login(config["USERNAME"], config["PASSWORD"]);

    config["ACCOUNT_LIST"].forEach(async (username) => {
        const date = Date.now();
        const [month, day, year] = date.toLocaleDateString("en-US").split("/");
        const [hour, minute, _] = date.toLocaleTimeString("en-US").split(/:| /)

        const filename = year+"-"+month+"-"+day+"_"+hour+"-"+minute+"_"+username+".json";

        const images = await ig.scrapeImages(username, 100);

        fs.writeFileSync(
            config["JSON_FILES"] + filename,
            JSON.stringify(images, null, 2)
        );
    })

})();
