
 class goToNewTab{
    constructor(page){
        this.txtUserName = page.locator('input[name="username"]');
        this.lblUserName = page.getByLabel('Username:');
    }
 }

 export default goToNewTab;