import { Given, Then } from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import documentationTab from "../pages/documentationTab.js";




Given("User login to the website",async function(){
    console.log("User login to the website");
    await this.pages.loginPage.visitPage('https://rahulshettyacademy.com/loginpagePractise/');
    await this.pages.newTab.lblUserName.fill("rahulshettyacademy");
    await expect(this.pages.newTab.lblUserName).toHaveValue("rahulshettyacademy");
    const [newPage] = await Promise.all([
        this.context.waitForEvent('page'),
        this.pages.newTab.documentLink.click()
    ]);
    this.documentPage = new documentationTab(newPage);
})

Then("User verifies the text in new tab",async function(){
    console.log("User verifies the text in new tab");
    await expect(this.documentPage.paragraph1).toContainText("Note : This template needs to be strictly followed");
    const mailId = await this.documentPage.mailIdText.textContent();
    console.log("Mail ID is: " + mailId);
    await this.pages.newTab.lblUserName.fill(mailId);
    await expect(this.pages.newTab.lblUserName).toHaveValue(mailId);
    console.log("Value of username field is: " + await this.pages.newTab.lblUserName.inputValue());
    expect(await this.pages.newTab.lblUserName.inputValue()).toBe(mailId);
});