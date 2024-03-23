const todoItems = document.querySelectorAll('.todo')
const todoContainer = document.querySelector('#todo_container')
const themeIcon = document.getElementById('theme-icon')
const themeToggle = document.getElementById('theme')
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let localStorageTheme = localStorage.getItem("theme");



function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

const toggleTheme = () => {
    localStorageTheme = localStorage.getItem("theme")
    let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    
    if (themeToggle.checked) {
        themeIcon.src = "../images/icon-sun.svg"
    } else if (!themeToggle.checked) {
        themeIcon.src = "../images/icon-moon.svg"
    }

    document.querySelector("html").setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    currentThemeSetting = newTheme;

}

const setDefaultPreferenceTheme = () => {
    if(!localStorageTheme || localStorageTheme == null) return
    if(localStorageTheme) {
        document.querySelector("html").setAttribute("data-theme", localStorageTheme);
    }
    if(localStorageTheme && localStorageTheme == 'dark') {
        themeIcon.src = "../images/icon-moon.svg"
        themeToggle.checked = false
    }
    else if(localStorageTheme && localStorageTheme == 'light') {
        themeIcon.src = "../images/icon-sun.svg"
        themeToggle.checked = true
    }
}


const setTodoDraggableBehaviour = () => {
  todoItems.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });

  let dragItem = null;

  function handleDragStart(event) {
    dragItem = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', '');
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnter(event) {
    this.classList.add('over');
  }

  function handleDragLeave(event) {
    this.classList.remove('over');
  }

  function handleDrop(event) {
    event.preventDefault();
    this.classList.remove('over');

    if (event.target !== dragItem) {
      this.parentNode.insertBefore(dragItem, this.nextSibling);
    }
  }

  function handleDragEnd(event) {
    todoItems.forEach(function(item) {
      item.classList.remove('over');
    });
    dragItem = null;
  }
}

setDefaultPreferenceTheme()
setTodoDraggableBehaviour()