import cartApplicationPage from "../pages/cartApplicationPage.js";
import goToNewTab from "../pages/goToNewTab.js";
import loginPage from "../pages/loginPage.js";

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

    get cartApplication(){
        return new cartApplicationPage(this.page);
    }
}

export default pageManager;