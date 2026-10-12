class cartApplicationPage{
    constructor(page){
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
    }

}

export default cartApplicationPage;