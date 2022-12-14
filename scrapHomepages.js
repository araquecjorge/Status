import puppeteer from 'puppeteer';
import ObjectsToCsv from 'objects-to-csv';

/*async function blockImages(page) {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
        if (request.resourceType === "image") {
            request.abort();
        } else {
            request.continue();
        }
    });
}*/
(async () => {

    const result = [];

    const urls = [
        "http://www.protectron.com/",
        "http://www.groupe-sfp.com/",
        "http://www.ems.ch/",
        "http://www.bankcoop.ch",
        "http://www.ihs.ch",
        "http://www.cameronrh.com/",
        "http://www.csssalphonsedesjardins.ca/",
        "http://www.coalision.com/",
        "http://jpso.com/",
        "http://www.specialtymetals.com/"
    ];


    for (let x = 0; x < urls.length; x++) {

        let item = {};

        console.log("processing url", urls[x]);
        process.on("uncaughtException", (e) => {

        });
        process.on("unhandledRejection", (reason, p) => {

        });
        const args = [
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ];
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            dumpio: true,
        };
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        //blockImages(page);

        try {

            const resToHome = await page.goto(urls[x], { timeout: 30000, waitUntil: "load" });
            item.homeUrl = urls[x]
            item.code = resToHome.status();
            //console.log("Success to open Url");

            result.push(
                item
            );

        } catch {

            item.homeUrl = urls[x];
            item.code = 404;

            result.push(
                item
            );
        }



        await page.close();
        await browser.close();


    }

    console.log(result);

    const csv = new ObjectsToCsv(result);
    await csv.toDisk('./scrapHome.csv', { append: true });

})();