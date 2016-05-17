function openMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    
    overlay.classList.add('open');
}

function closeMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    if (window.event.target.nodeName !== 'A')
        overlay.classList.remove('open');
}