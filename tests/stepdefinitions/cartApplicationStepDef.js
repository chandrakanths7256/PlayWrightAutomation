import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";


Given("user login to the cart application",async function(){
    console.log("user login to the cart application");
    await this.pages.loginPage.visitPage('https://rahulshettyacademy.com/client'); 
    await this.pages.cartApplication.userEmail.waitFor();
    await this.pages.cartApplication.userEmail.fill("chandrakanth007@gmail.com");
    await this.pages.cartApplication.userPassword.fill("Chan@123");
    await this.pages.cartApplication.btnLogin.click();
    await this.pages.cartApplication.cartHeading.waitFor();
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeading.textContent());
    await expect(this.pages.cartApplication.cartHeading).toHaveText("Automation");
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeadingDescription.textContent());
    await expect(this.pages.cartApplication.cartHeadingDescription).toHaveText("Automation Practice");
})

Then(/^User selects the cart item dynamically (.*):(.*)/,async function(expectedItem,successCartMessage){
    console.log("User selects the cart item dynamically");
    const cartItems = await this.pages.cartApplication.cartItems.all();
    console.log(await this.pages.cartApplication.cartItems.locator('b').allTextContents());
    for(const items of cartItems){
        const text = await items.locator('b').textContent();
        if(text === expectedItem){
            await items.locator('text=Add to Cart').click();
            break;
        }
    }
    await this.pages.cartApplication.cartAddedToastMessage.waitFor();
    await expect(this.pages.cartApplication.cartAddedToastMessage).toHaveText(successCartMessage);
})

Then(/^User verifies the items are added to the cart (.*)$/,async function(expectedItem){
    console.log("User verifies the items are added to the cart");
    await this.pages.cartApplication.btnCart.click();
    await this.pages.cartApplication.myCartHeading.waitFor();
    console.log("Heading is: "+await this.pages.cartApplication.myCartHeading.textContent());
    await expect(this.pages.cartApplication.myCartHeading).toHaveText("My Cart");
    const myCartItems = await this.pages.cartApplication.myCartItemName.all();
    let isAdded = false;
    for(const items of myCartItems){
        const text = await items.textContent();
        if(text === expectedItem){
            isAdded = true;
            console.log("Item is added to the cart successfully");
            break;
        }
    }
    await expect(isAdded).toBeTruthy();
})