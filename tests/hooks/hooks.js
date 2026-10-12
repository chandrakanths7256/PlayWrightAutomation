import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import pageManager from "../common/pageManager.js";
import { expect } from "@playwright/test";

setDefaultTimeout(60000);
expect.configure({ timeout: 30000 });

Before(async function(){
    this.browser = await chromium.launch({headless: false});
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.pages = new pageManager(this.page);
    console.log("context page created");
})

After(async function(){
    // await this.page.close();
    // await this.context.close();
    // await this.broswer.close();
    // console.log("context page closed");
})