import { BaseScreen } from "../../../core/component/base-screen.component"

export class Auth extends BaseScreen {

    constructor(title){ 
        super({title: 'Auth'})
    }

    render(){
        return '<p>Auth</p>'
    }
}