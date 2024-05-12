import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

import styles from './header.module.scss'
import template from './header.template.html'

export class Header extends ChildComponent {
	constructor({router}){
		super()

		this.component = 'header'
		this.router = router
		
	}
	render() {
		this.element = renderService.htmlToElement(template, [
			Logo,
			new LogoutButton({
				router: this.router
			}),			
			Search,			
			new UserItem({
				avatarPath:
					'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg',
				name: 'Dima'
	})
		], styles)

		return this.element
	}
}
