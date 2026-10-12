class documentationTab{
    constructor(page){
        this.paragraph1 = page.locator('#interview-material-container p[class="im-para"]:nth-child(3)');
        this.mailIdText = page.locator('#interview-material-container a[href*="mail"]'); 
    }
}

export default documentationTab;