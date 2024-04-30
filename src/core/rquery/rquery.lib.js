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

    append(){

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