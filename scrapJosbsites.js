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
        "http://bc.tbe.taleo.net/BC11/ats/careers/searchResults.jsp?org=PROTECTRON_&cws=37",
        "http://www.groupe-sfp.com/Emplois",
        "http://www.ems.ch/de/stellenangebote/offene-stellen/",
        "http://www.bankcoop.ch/BankCoop/Jobs-und-Karriere",
        "http://www.ihs.ch/de/jobs/offer.html",
        "http://www.cameronrh.com/offres-emploi#page",
        "http://csssgl.cvmanager.com/cvm5/displayrows.aspx?region=qc&search=y&mode=search&tn=jobs&lang=f&tp1=joblist",
        "http://www.coalision.com/category/careers/?lang=fr_CA",
        "http://jpso.com/Jobs.aspx",
        "http://www.specialtymetals.com/careers-at-specialty-metals/"
    ];


    for (let x = 0; x < urls.length; x++) {


        let item = {};

        //console.log("processing url", urls[x]);
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

            const resToJobsite = await page.goto(urls[x], { timeout: 30000, waitUntil: "load" });
            item.jobsiteUrl = urls[x];
            item.code = resToJobsite.status();
            //console.log("Success to open Url");

            result.push(
                item
            );

        } catch {
            item.jobsiteUrl = urls[x];
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
    await csv.toDisk('./scrapJosbite.csv', { append: true });

})();