export class Layout {
    constructor({router, children}){
        this.router = router
        this.children = children
    }

    render(){
        const headerHTML = `<header>
            Hrader
            <nav>
                <a href="/">Home</a>
                <a href="/about-us">AboutUs</a>
            </nav>
        </header>`

        return `
            ${headerHTML}
            <main>
                ${this.children}
            </main>
        `
    }
}