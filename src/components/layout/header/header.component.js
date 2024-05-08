import ChildComponent from "@/core/component/child.component"
import renderService from "@/core/services/render.service"
import { UserItem } from "@/components/ui/user-item/user-item.component"
import { $R } from "@/core/rquery/rquery.lib"
import { Heading } from "@/components/ui/heading/heading.component"

import template from "./header.template.html"
import styles from './header.module.scss'

export class Header extends ChildComponent {   
   
       
    render(){
        this.element = renderService.htmlToElement(template, [], styles)

        $R(this.element).append(new UserItem().render())

        //$R(this.element).append(new Heading().render()).text('Это заголовок')
        const heading = $R(this.element).append(new Heading().render()).find('h3').text('Это заголовок')
       
        return this.element
        
    }
}