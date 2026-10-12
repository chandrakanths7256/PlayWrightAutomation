import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";


Given("user login to the cart application",async function(){
    console.log("user login to the cart application");
    await this.pages.loginPage.visitPage('https://rahulshettyacademy.com/client');
    await this.pages.cartApplication.userEmail.fill("chandrakanth007@gmail.com");
    await this.pages.cartApplication.userPassword.fill("Chan@123");
    await this.pages.cartApplication.btnLogin.click();
    await this.pages.cartApplication.cartHeading.waitFor();
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeading.textContent());
    await expect(this.pages.cartApplication.cartHeading).toHaveText("Automation");
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeadingDescription.textContent());
    await expect(this.pages.cartApplication.cartHeadingDescription).toHaveText("Automation Practice");
})

Then("User selects the cart item dynamically",async function(){
    console.log("User selects the cart item dynamically");
    const expectedItem = "ZARA COAT 3";
    const successCartMessage = "Product Added To Cart";
    const cartItems = await this.pages.cartApplication.cartItems.all();
    for(const items of cartItems){
        const text = await items.locator('b').textContent();
        if(text === expectedItem){
            await items.locator(' .fa-shopping-cart').click();
        }
    }
    await this.pages.cartApplication.cartAddedToastMessage.waitFor();
    await expect(this.pages.cartApplication.cartAddedToastMessage).toHaveText(successCartMessage);
})