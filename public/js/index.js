const mask = document.querySelector('.mask')
const menuBtn = document.querySelector('#side-menu-toggle')
const sideDrawer = document.querySelector('.mobile-nav')

// console.log(mask)
// console.log(menuBtn)
// console.log(sideDrawer)
mask.addEventListener('click', maskClickHandler)
menuBtn.addEventListener('click', menuToggleClickHandler)


function maskClickHandler() { 
    mask.getElementsByClassName.display = none
    sideDrawer.classList.remove('open')
}

function menuToggleClickHandler() { 
    // console.log(1111)
    mask.getElementsByClassName.display = 'block'
    sideDrawer.classList.add('open')
}