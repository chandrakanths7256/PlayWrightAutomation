class loginPage{
    constructor(page){
        this.page = page;
    }
     async visitPage(url){
        console.log("hello");
        await this.page.goto(url);
    }
}

export default loginPage;