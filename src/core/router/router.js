import { $R } from "../rquery/rquery.lib";
import { ROUTES } from "./routes.data";
import { Layout } from "@/components/layout/layout.component";

export class Router {

    #routes = ROUTES //В класс добавляем список роутов
    #currentRoute = null
    #layout = null

    constructor(){      
        
        window.addEventListener('popstate', () => { //Перехватываем события браузера типа "Назад" "Вперёд" и запускаем #handleRouteChange
            this.#handleRouteChange()
        })

        this.#handleRouteChange() //Запускаем метод для отслеживания текущего урла 
        this.#handleLinks()
    }

    #handleLinks(){
        document.addEventListener('click', event => { //Слушатель собтытий: реагирует на клик на ссылку
            const target = event.target.closest('a')

            if(target){ //Если таргет сработал, то отключаем дефолтное поведение ссылки
                event.preventDefault()
                this.navigate(target.href)
            }
        })
    }

    getCurrentPath(){
        return window.location.pathname //Получаем текущий URL
    }

    navigate(path){ // Если текущий урл не равен тому, который в таргете, пушим новый урл и запускаем #handleRouteChange
        if(path !== this.getCurrentPath()){
            window.history.pushState({},'',path)
            this.#handleRouteChange()                
        }
    }

    #handleRouteChange(){
        const path = this.getCurrentPath() || '/' //Присваиваем текущую урлу, если нету - главную страницу 
        let route = this.#routes.find(route => route.path === path) //Находим в списке роутов тот компонент, который соответствует полученному урлу

        

        if(!route){ //Если соответствующего компонента не найдено - назначаем компонент 404 страницы
            route = {
                component: NotFound
            }
        }

        this.#currentRoute = route //Присваиваем переменной #currentRoute найденный route        
        this.#render()
    }

    #render(){
        const component = new this.#currentRoute.component().render() //Соэдаём экземпляр класса компонента страницы  
        
        if(!this.#layout) {  //Если шаблон ещё не загружен - создаём экземпляр и передаём в него пропсы: роуты и чилдрена
            this.#layout = new Layout({
                router: this,
                children: component
            }).render()
            
            $R('#app').append(this.#layout)            
        }
        else { //Иначе - заменяем контентную часть              
            $R('#content').html('').append(component)         
        }        
    }

}
