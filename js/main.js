const tasks = document.getElementsByClassName('task')
const tasksContainer = document.getElementById('tasks_container')
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

const taskDragOver = ( e ) => { e.preventDefault() }
const taskDrop = ( e ) => {
    let selected = e.target
    let data = e.dataTransfer.getData('task')
    tasksContainer.appendChild(document.getElementById(data))
    selected = null
}

// for(task of tasks) {
//     task.addEventListener('dragstart', (e) => {
//         let selected = e.target
//         tasksContainer.addEventListener('dragover', (e) => {
//         })
//         tasksContainer.addEventListener("drop", (e) => {
//         })

//     })
// }

setDefaultPreferenceTheme()