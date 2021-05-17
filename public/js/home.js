const rotate1 = document.getElementById('rotate1')
const rotate2 = document.getElementById('rotate2')
const rotate3 = document.getElementById('rotate3')
const navbutton = document.getElementById('nav_toggle')
const nav_toggle_container = document.getElementById('nav_toggle_container')
const categories_mobile = document.getElementById('categories_mobile')
const logo = document.querySelector('.logo')
var collapsed = false
function collapse() {
    if(!collapsed){
        nav_toggle_container.style.backgroundColor = 'black'
        categories_mobile.style.display = 'block'
        rotate1.style.transform = "rotate(405deg)"
        rotate1.style.backgroundColor = 'grey'
        rotate1.style.position = 'absolute'
        rotate2.style.display = 'none'
        rotate3.style.transform = 'rotate(315deg)'
        rotate3.style.backgroundColor = 'grey'
        collapsed = true
        navbutton.style.marginTop = '3vw'
        logo.style.color = 'white'
        return
    }
    rotate1.style.transform = "rotate(0deg)"
    rotate1.style.position = 'relative'
    rotate1.style.backgroundColor = '#2f2f2f'
    rotate2.style.display = 'block'
    rotate3.style.transform = 'rotate(0deg)'
    rotate3.style.position = 'relative'
    rotate3.style.backgroundColor = '#2f2f2f'
    collapsed = false
    navbutton.style.marginTop = '1.5vw'
    logo.style.color = 'black'
    nav_toggle_container.style.background = 'none'
    categories_mobile.style.display = 'none'
}

const makeChanges = () => {
    if(collapsed) {
    rotate1.style.transform = "rotate(0deg)"
    rotate1.style.position = 'relative'
    rotate1.style.backgroundColor = '#2f2f2f'
    rotate2.style.display = 'block'
    rotate3.style.transform = 'rotate(0deg)'
    rotate3.style.position = 'relative'
    rotate3.style.backgroundColor = '#2f2f2f'
    collapsed = false
    navbutton.style.marginTop = '1.5vw'
    logo.style.color = 'black'
    nav_toggle_container.style.background = 'none'
    categories_mobile.style.display = 'none'
    }
}