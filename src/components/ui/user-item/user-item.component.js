import ChildComponent from "@/core/component/child.component"
import renderService from "@/core/services/render.service"
import { $R } from "@/core/rquery/rquery.lib"

import template from "./user-item.template.html"
import styles from './user-item.module.scss'

export class UserItem extends ChildComponent {   
   
       
    render(){
        this.element = renderService.htmlToElement(template, [], styles)
        
        $R(this.element).text('Пользователь')
        return this.element
        
    }
}