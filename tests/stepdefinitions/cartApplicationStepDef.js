import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { checkoutDetailData } from "../Constants/userData.js";


Given(/^user login to the cart application (.*):(.*)/,async function(email,password){
    console.log("user login to the cart application");
    await this.pages.loginPage.visitPage('https://rahulshettyacademy.com/client');
    await this.page.waitForLoadState('networkidle');
    await this.pages.cartApplication.loginHeading.waitFor({timeout: 100000});
    await expect(this.pages.cartApplication.loginHeading).toHaveText("Log in"); 
    await this.pages.cartApplication.userEmail.waitFor();
    await this.pages.cartApplication.userEmail.fill(email);
    await this.pages.cartApplication.userPassword.fill(password);
    await this.pages.cartApplication.btnLogin.click();
    await this.pages.cartApplication.cartHeading.waitFor();
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeading.textContent());
    await expect(this.pages.cartApplication.cartHeading).toHaveText("Automation");
    console.log("Heading is: "+ await this.pages.cartApplication.cartHeadingDescription.textContent());
    await expect(this.pages.cartApplication.cartHeadingDescription).toHaveText("Automation Practice");
})

Then(/^User selects the cart item dynamically (.*):(.*)/,async function(expectedItem,successCartMessage){
    console.log("User selects the cart item dynamically");
    const cartItems = this.pages.cartApplication.cartItems;
    console.log(await cartItems.locator('b').allTextContents());
    for(const items of await cartItems.all()){
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
    await this.pages.cartApplication.myCartHeading.isVisible();
    console.log("Heading is: "+await this.pages.cartApplication.myCartHeading.textContent());
    await expect(this.pages.cartApplication.myCartHeading).toHaveText("My Cart");
    await this.pages.cartApplication.myCartItemName.waitFor();
    const myCartItems = this.pages.cartApplication.myCartItemName;
    console.log(await myCartItems.allTextContents());
    let isAdded = false;
    for(const items of await myCartItems.all()){
        const text = await items.textContent();
        if(text === expectedItem){
            isAdded = true;
            console.log("Item is added to the cart successfully");
            break;
        }
    }
    await expect(isAdded).toBeTruthy();
})

Then(/^User checkout the items from the cart and place the order (.*)/,async function(email){
    await this.pages.cartApplication.btnCheckout.click();
    const checkoutFields = this.pages.cartApplication.checkoutDetails;
    for(const fields of await checkoutFields.all()){
        const text = await fields.textContent();
        console.log("Checkout field is: "+text);
        for (const key in checkoutDetailData){
            if(text.trim() === key.trim()){
                await fields.locator('..').locator('input').fill(checkoutDetailData[key]);
            }
        }
        if(text.trim() === "Expiry Date"){
            await fields.locator('..').locator('select').nth(0).selectOption('12');
            await fields.locator('..').locator('select').nth(1).selectOption('31');
        }
    }
    await this.pages.cartApplication.btnApplyCoupon.click();
    await this.pages.cartApplication.successCouponMessage.waitFor();
    await expect(this.pages.cartApplication.successCouponMessage).toHaveText("* Coupon Applied");
    await expect(this.pages.cartApplication.successCouponMessage).toHaveAttribute('style','color: green;');
    await this.pages.cartApplication.selectCountry.pressSequentially("United");
    await this.pages.cartApplication.selectCountryOptions(' United States').click();
    console.log(await this.pages.cartApplication.lblUserEmail.textContent());
    await expect(this.pages.cartApplication.lblUserEmail).toHaveText(email);
    await this.pages.cartApplication.btnPlaceOrder.click();
})

Then("User verfies the order is placed successfully",async function(){
    await this.pages.cartApplication.txtThankyouOrder.waitFor();
    console.log(await this.pages.cartApplication.txtThankyouOrder.textContent());
    await expect(this.pages.cartApplication.txtThankyouOrder).toHaveText(" Thankyou for the order. ");
})

Then("User verifies the order is stored in the orders history",async function(){
    let myOrderId = await this.pages.cartApplication.orderId.textContent();
    myOrderId = myOrderId.replaceAll('|','').trim();
    await this.pages.cartApplication.btnMyOrders.click();
    await this.pages.cartApplication.MyOrdersHeading.waitFor();
    console.log(await this.pages.cartApplication.MyOrdersHeading.textContent());
    const orders = await this.pages.cartApplication.tableOrders.all();
    let isOrdered = false;
    for(const order of orders){
        const orderId = await order.locator('th').textContent();
        console.log(`${orderId} == ${myOrderId}`)
        if(orderId == myOrderId){
            isOrdered = true;
            await order.locator('button').nth(0).click();
            break;
        }
    }
    expect(isOrdered).toBeTruthy();
    await this.pages.cartApplication.txtOrderSummaryHeading.waitFor();
    await expect(this.pages.cartApplication.txtOrderSummaryHeading).toHaveText(' order summary ');
    console.log(await this.pages.cartApplication.orderIdInSummary.textContent());
    await expect(this.pages.cartApplication.orderIdInSummary).toHaveText(myOrderId);
})