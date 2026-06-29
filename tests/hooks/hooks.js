import { After, Before } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import pageManager from "../common/pageManager.js";


Before(async function(){
    this.broswer = await chromium.launch({headless: false});
    this.context = await this.broswer.newContext();
    this.page = await this.context.newPage();
    this.pages = new pageManager(this.page);
    console.log("context page created");
})

After(async function(){
    await this.page.close();
    await this.context.close();
    await this.broswer.close();
    console.log("context page closed");
})