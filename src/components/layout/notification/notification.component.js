import ChildComponent from "@/core/component/child.component"
import renderService from "@/core/services/render.service"

import template from "./notification.template.html"
import styles from './notification.module.scss'
import { NotificationService } from "@/core/services/notification.service"
import { StorageService } from "@/core/services/storage.service"

export class Notification extends ChildComponent {   
   
    constructor(component = 'notification'){
		super()

		this.component = component
	}
       
    render(){
        this.element = renderService.htmlToElement(template, [], styles)        
        
        return this.element
        
    }
}