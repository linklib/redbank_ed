import { BaseScreen } from "../../../core/component/base-screen.component"

export class AboutUs extends BaseScreen{

    constructor(title){ 
        super({title: 'AboutUs'})
    }
    render(){
        return '<p>AboutUs</p>'
    }
}