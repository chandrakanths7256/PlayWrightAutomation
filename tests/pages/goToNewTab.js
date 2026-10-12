
 class goToNewTab{
    constructor(page){
        this.txtUserName = page.locator('input[name="username"]');
        this.lblUserName = page.getByLabel('Username:');
        this.documentLink = page.locator('a[href*="documents-request"]');
    }
 }

 export default goToNewTab;