const KEYCODES = {
  TAB: 9,
  ESC: 27,
  END: 35,
  HOME: 36,
  KEY_UP: 38,
  KEY_DOWN: 40
};
const menuButton = document.querySelector('#menuBtn');
const menu = document.querySelector('#menu');
const menuItems = document.querySelectorAll('#menu .dropdown-item');

// Menu functions
function checkKeyboardCloseMenu(e) {
  if (e.keyCode === KEYCODES.ESC || e.keyCode === KEYCODES.TAB) {
    closeMenu();
    e.preventDefault();
  }
}

function getActiveItemIndex(activeItem) {
  let result;
  menuItems.forEach((item, index) => {
    if (item === activeItem) {
      result = index;
    }
  });
  return result;
}

function menuKeyBoardAccessible(e) {
  switch(e.keyCode) {
    case KEYCODES.KEY_UP:
      // focus previous item or wrapping to the last one
      if (document.activeElement === menuItems[0]) {
        menuItems[menuItems.length - 1].focus();
      } else {
        menuItems[getActiveItemIndex(document.activeElement) - 1].focus();
      }
      break;
    case KEYCODES.KEY_DOWN:
      // focus next item or wrapping to the first one
      if (document.activeElement === menuItems[menuItems.length - 1]) {
        menuItems[0].focus();
      } else {
        menuItems[getActiveItemIndex(document.activeElement) + 1].focus();
      }
      break;
    case KEYCODES.HOME:
      menuItems[0].focus();
      break;
    case KEYCODES.END:
      menuItems[menuItems.length - 1].focus();      
      break;
  }
}

function onWindowClick(e) {
  if (e.target != menu && e.target != menuButton) {
    closeMenu();
  }
}

function isMenuOpen() {
  return menu.classList.contains('opened');
}

function openMenu() {
  // set "open" attributes
  menuButton.setAttribute("aria-expanded", "true");
  menu.classList.add('opened');

  // add listeners
  menu.addEventListener('keydown', checkKeyboardCloseMenu);
  menu.addEventListener('keydown', menuKeyBoardAccessible);
  window.addEventListener('click', onWindowClick);

  // focus first menu item
  menu.querySelector('a').focus();
}

function closeMenu() {
  // set "close" attributes
  menuButton.setAttribute("aria-expanded", "false");
  menu.classList.remove('opened');

  menu.removeEventListener('keydown', checkKeyboardCloseMenu);
  menu.removeEventListener('keydown', menuKeyBoardAccessible);
  window.removeEventListener('click', onWindowClick);

  // focus button
  menuButton.focus();
}

// open/close menu by click the menu button
menuButton.addEventListener('click', () => {
  isMenuOpen() ? closeMenu() : openMenu();
});
