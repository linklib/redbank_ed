import { BaseScreen } from "../../../core/component/base-screen.component"

export class NotFound extends BaseScreen {

    constructor(title){  
        super({title: '404'})
    }

    render(){
        changeTitle('Главная страница')

        return '<p>NotFound</p>'
    }
}