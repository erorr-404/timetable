const burgerMenuButton = document.querySelector("#burger-menu-button")
const navBar = document.querySelector("nav")

burgerMenuButton.addEventListener("click", function (event) {
    if (navBar.classList.contains("hidden")) {
        navBar.classList.remove("hidden")
    } else {
        navBar.classList.add("hidden")
    }
})