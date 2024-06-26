import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { BaseScreen } from '@/core/component/base-screen.component'

import styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends BaseScreen {
	constructor(){
		super({title: 'Auth'})
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}
