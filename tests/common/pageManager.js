import goToNewTab from "../pages/goToNewTab.js";
import loginPage from "./loginPage.js";

class pageManager{
    constructor(page){
        this.page = page;
    }

    get loginPage(){
        return new loginPage(this.page);
    }

    get newTab(){
        return new goToNewTab(this.page);
    }
}

export default pageManager;