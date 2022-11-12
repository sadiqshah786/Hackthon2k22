// loader 
let loader = document.getElementById('loader')
loaderShow = () => {
    setTimeout(() => {
        loader.classList += " none"
    }, 1000)
}
