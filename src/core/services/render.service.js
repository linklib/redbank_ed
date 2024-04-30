import ChildComponent from "../component/child.component"


class RenderService {

    /**
     * @param {string} html
     * @param {string} components
     * @param {string} [styles]
     * @return {HTMLElement}
    */
    htmlToElement(html, components = [], styles){
        const template = document.createElement('template') //Создаём тег-обёртку, его в доме не видно
        template.innerHTML = html.trim()  //Добавляем в переменную пришедший html, очищенный от лишних пробелов
        const element = template.content.firstChild // Забираем чистый html код

        if(styles) {            
            this.#applyModuleStyles(styles, element)            
        } 
        
        this.#replaceComponentTags(element, components)

        return element
    }

    /**
     * @param {HTMLElement} parentElement
     * @param {Array} components
     * Здесь находим в хтмл все теги, начинающиеся с {component-} и очищаем название тегов от {component-} 
     */
    #replaceComponentTags(parentElement, components){
        const componentTagPattern = /^component-/ //Регулярное выражение, по которому будем искать нужные теги
        const allElements = parentElement.getElementsByTagName('*') //Запихали все элементы

        for (const element of allElements) { //Обегаем все элементы
            const elementTagName = element.tagName.toLowerCase()
            if(componentTagPattern.test(elementTagName)){
                const componentName = elementTagName
                .replace(componentTagPattern,'') //Убираем {component}
                .replace(/-/g,'') //Убираем {-}

                const foundComponent = components.find(Component => {
                    const instance = 
                        Component instanceof ChildComponent ? Component: new Component() //Если элемент является экземпляром ChildComponent, то возвращаем компонент ,а если нет - то создаём экземпляр компонента       

                    return instance.constructor.name.toLowerCase() === componentName    //constructor.name это по сути название класса. Это проверка на наличие класса
                })    

                if(foundComponent){
                    const componentContent = 
                    foundComponent instanceof ChildComponent
                    ? foundComponent.render()
                    : new foundComponent().render()
                    element.replaceWith(componentContent)
                } else{
                    console.error(
                        `Component "${componentName} not found in provided component array"`
                    )
                }
            }
        }
    }

    /**
     * @param {Object} moduleStyle
     * @param {string} element
     * @return {void}
     */
    #applyModuleStyles(moduleStyle,element){
        if(!element) return

        const applyStyles = element => { //Обходим объект moduleStyle, вытаскиваем [key,value]
            for (const [key,value] of Object.entries(moduleStyle)){ 
                if(element.classList.contains(key)){
                    element.classList.remove(key)
                    element.classList.add(value)            
                }
            } 
        }

        if(element.getAttribute('class')){ //Это для родительского элемента
            applyStyles(element)
        }

        const elements = element.querySelectorAll('*')  //Это для детей
        elements.forEach(applyStyles)

    }

}

export default new RenderService()