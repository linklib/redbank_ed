import ChildComponent from "@/core/component/child.component"
import renderService from "@/core/services/render.service"
import { $R } from "@/core/rquery/rquery.lib"

import template from "./heading.template.html"
import styles from './heading.module.scss'

export class Heading extends ChildComponent {   
   
    
       
    render(){
        this.element = renderService.htmlToElement(template, [], styles)       
        return this.element
        
    }
}