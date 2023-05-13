require("dotenv").config();
const { setTimeout } = require("timers/promises");

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

module.exports = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );

    await page.goto("https://students.sbschools.org/genesis/sis/view?gohome=true");

    await page.type("#j_username", process.env.USERID);
    await setTimeout(Math.random() * 2000);
    await page.type("#j_password", process.env.PASSWORD);

    await page.click(".saveButton");
    await page.waitForNavigation();

    const [gb] = await page.$x("//span[contains(text(), 'Gradebook')]");
    await gb?.click();

    await page.waitForNavigation();
    const html = await page.evaluate(() => document.documentElement.innerHTML);
    await browser.close();

    const $ = cheerio.load(html);
    const tableRows = $("tr[class^='listrow']");

    const subjects = [];
    const grades = [];
    const classGrades = [];

    for (let i = 0; i < tableRows.length; i++) {
        for (const child of tableRows.get(i).children) {
            if ($(child).attr("class") == "cellLeft" && $(child).find(".categorytab").length)
                subjects.push($(child).text().trim());
            else if ($(child).attr("class") == "cellRight") {
                let childText = $(child).text().trim();
                if (childText.includes("Not")) childText = "";

                grades.push(childText.replace(/[\s\D]+/, ""));
            }
        }
    }

    for (let i = 0; i < subjects.length; i++) classGrades.push([subjects[i], parseInt(grades[i])]);
    return classGrades;
};
