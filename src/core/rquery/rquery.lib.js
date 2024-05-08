import { formatCardNumberWithDashes } from "@/utils/format/format-card-number"

/**
 * Класс RQuery для работы с DOM элементами
 */
class RQuery {

    /**
     * Create a new RQuery instance
     * @param {string|HTMLElement} selector - CSS selector or HTMLElement
     */
    constructor(selector){
        if(typeof selector === 'string'){ //Если прилетела строка, то находим по селектору и закидывем в переменную объект дома 
            this.element = document.querySelector(selector)
        
            if(!this.element) {
                throw new Error(`Element ${selector} not found`)
            }
        }else if(selector instanceof HTMLElement) { // Если прилетел уже объект дома - сразу его пробрасываем в this.element
            this.element = selector
        }else {
            throw new Error('Invalid selector type')
        } 

    }

    /**
     * 
     * @param {HTMLElement} selector 
     * @returns 
     */
    find(selector){
        const element = new RQuery(this.element.querySelector(selector))
        
        if(element){
           return element 
        } else {
            throw new Error(`Element ${selector} not found!`)
        }
    }

		 /**
     * Add element in parent element
     * @param {HTMLElement} childElement 
     * @returns {RQuery} Current element
     */
		 append(childElement){		
			if(!(childElement instanceof HTMLElement)) { 
				throw new Error('Element must be an HTMLElement')						}	
			
			this.element.appendChild(childElement)
			return this
		}

		/**
     * Insert element before selected element
     * @param {HTMLElement} newElement 
     * @returns {RQuery} Current element
     */
		before(newElement){
			if(!(newElement instanceof HTMLElement)) { 
				throw new Error('Element must be an HTMLElement')			
			}	
				const parentElement = this.element.parentElement
				if(parentElement){
					parentElement.insertBefore(newElement, this.element)
					return this
				}else{
					throw new Error('Element does not have a parent element')
				}
		}

		/**
		 * Get or set inner HTML of selected element
		 * @param {string} [htmlContent] Optional HTML content to set. If empty - return inner HTML
		 * @returns {RQuery|string} 
		 */
		html(htmlContent){
			if(typeof htmlContent === 'undefined'){
				return this.element.innerHTML
			}else {
				this.element.innerHTML = htmlContent
				return this
			}
		}
		
		/**
		 * Add text to element
		 * @param {string} text  
		 */
		text(text){
			if(typeof property === 'string'){
				throw new Error('Text mast be string')
			}
			const pullText = document.createTextNode(text)		
			this.element.append(pullText)
			return this
		}

		/**
		 * Attach a click event listener to the selected element.
		 * @param {function(Event): void} callback - The ivent listener function to exicute when selecter element is ckicked
		 * @return {RQuery} The current RQuery instance for chaining 
		 */
		click(callback){
			this.element.addEventListener('click', callback)
			return this
		}

		/**
		 * Set attributes and listeners for an input element
		 * @param {object} options Fn object containing input options
		 * @param {function(Event): void} [options.onInput] The event listener for the input event
		 * @param {object} [options.rest] Jptional attributes to set on the input element
		 * @returns {RQuery} The current RQuery instance for chaining 
		 */
		input({onInput, ...rest}){
				if(!this.element.tagName.toLowerCase() === 'input') throw new Error('Must be INPUT')

				for (const [key,value] of Object.entries(rest)){
					this.element.setAttribute(key, value)
				}

				if (onInput) {
					this.element.addEventListener('input',onInput)
				}

				return this
		}

		/**
		 * Set attributes and listeners for an number input element
		 * @param {number} [limit] The maximum lenght of input value
		 * @returns {RQuery} The current RQuery instance for chaining 
		 */
		numberInput(limit){
			if(this.element.tagName.toLowerCase() !== 'input' || this.element.type !== 'number' ) throw new Error('Must be INPUT whith type "number"')

			this.element.addEventListener('input', event => {
				let value = event.target.value.replace(/[^0-9]/g,'')
				if (limit) value = value.substring(0,limit) 
				event.target.value = value
			})

			return this
		}

		/**
		 * Set attributes and listeners for an credit card input element		 * 
		 * @returns {RQuery} The current RQuery instance for chaining 
		 */
		creditCardInput(){
			const limit = 16

			if(this.element.tagName.toLowerCase() !== 'input' || this.element.type !== 'text' ) throw new Error('Must be INPUT whith type "text"')

			this.element.addEventListener('input', event => {
				let value = event.target.value.replace(/[^0-9]/g,'')
				if (limit) value = value.substring(0,limit)
				event.target.value = formatCardNumberWithDashes(value)
			})

			return this
		}


		/**
		 * Set CSS style of the selected element
     * @param {string} property 
     * @param {string} value
     * @returns {RQuery} Current RQuery instance for  changing
     */
    css(property, value){
        if(typeof property !== 'string' || typeof value !== 'string'){
            throw new Error('Property and value mast be string')
        }

        this.element.style[property] = value
        return this //Возврат именно в такой форме, чтобы к результату можно было применять други еметоды по цепочке
    }

		/**
		 * Adds a class or a list of classes to current element
		 * @param {string|string[]} classNames
		 * @returns {RQuery} The current RQuery instance for chaining 
		 */
		addClass(classNames){
			if(Array.isArray(classNames)){
				for (const className of classNames){
					this.element.classList.add(className)
				}
			} else {
				this.element.classList.add(classNames)
			}

			return this
		}

		/**
		 * Remove a class or a list of classes to current element
		 * @param {string|string[]} classNames
		 * @returns {RQuery} The current RQuery instance for chaining 
		 */
		removeClass(classNames){
			if(Array.isArray(classNames)){
				for (const className of classNames){
					this.element.classList.remove(className)
				}
			} else {
				this.element.classList.remove(classNames)
			}
			
			return this
		}


   

}

/**
 * Create a new instance for the given selector
 * @param {string|HTMLElement} selector 
 * @returns {RQuery}
 */
export function $R(selector){ //Функция для удобства, чтобы не создавать каждый раз экземпляр RQuery, а сразу обращаться через $R
    return new RQuery(selector)
}