class loginPage{
    constructor(page){
        this.page = page;
    }
     async visitPage(url){
        await this.page.goto(url);
    }
}

export default loginPage;