import { Given } from "@cucumber/cucumber";
import {expect} from "@playwright/test";


Given("User login to the website",async function(){
    await this.pages.loginPage.visitPage('https://rahulshettyacademy.com/loginpagePractise/');
    await this.pages.newTab.lblUserName.fill("rahulshettyacademy");
    await expect(this.pages.newTab.lblUserName).toHaveValue("rahulshettyacademy");
})