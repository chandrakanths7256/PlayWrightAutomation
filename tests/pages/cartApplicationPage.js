class cartApplicationPage{
    constructor(page){
        this.loginHeading = page.locator('.login-title');
        this.userEmail = page.locator('input[id="userEmail"]');
        this.userPassword = page.locator('input[id="userPassword"]');
        this.btnLogin = page.locator('input[value="Login"]');
        this.cartHeading = page.getByRole('heading',{name:'Automation'});
        this.cartHeadingDescription = page.locator('p',{hasText:'Automation Practice'}); 
        this.cartItems = page.locator('.card-body');
        this.cartAddedToastMessage = page.locator('#toast-container');
        this.btnCart = page.locator('button[routerlink*="cart"]');
        this.myCartHeading = page.locator('h1:has-text("My Cart")'); //Pseudo class selector
        this.myCartItemName = page.locator('.cartSection h3');
        this.btnCheckout = page.locator("text=Checkout");
        this.checkoutDetails = page.locator('.field .title');
        this.btnApplyCoupon = page.getByRole('button',{name:'Apply Coupon'});
        this.successCouponMessage = page.locator('.field p');
        this.selectCountry = page.locator('input[placeholder="Select Country"]');
        this.selectCountryOptions = (country) => page.locator('.list-group:nth-child(2) button').getByText(country,{exact:true});
        this.lblUserEmail = page.locator('.user__name [type="text"]').nth(0);
        this.btnPlaceOrder = page.locator('.action__submit');
        this.txtThankyouOrder = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.btnMyOrders = page.locator('button[routerlink*="myorders"]')
        this.MyOrdersHeading = page.getByRole('heading',{name:'Your Orders'});
        this.tableOrders = page.locator('tbody tr');
        this.txtOrderSummaryHeading = page.locator('.email-title').nth(0);
        this.orderIdInSummary = page.locator('.col-text ').nth(0);
    }

}

export default cartApplicationPage;