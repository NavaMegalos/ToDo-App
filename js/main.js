const todoContainer = document.querySelector('#todo_container')
const themeIcon = document.getElementById('theme-icon')
const themeToggle = document.getElementById('theme')
const newTodo = document.getElementById('new_todo')
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let todoItems = document.querySelectorAll('.todo')
let localStorageTheme = localStorage.getItem("theme");



const calculateSettingAsThemeString = ({ localStorageTheme, systemSettingDark }) => {
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
  todoItems = document.querySelectorAll('.todo')
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

const checkInput = () => {
  let inputValue = newTodo.value
  return inputValue.trim().length > 0 
}

const createNewTodoItem = () => {
  let divTodo = document.createElement('div')
  let inputDescription = document.createElement('input')
  let spanDot = document.createElement('span')
  let spanClose = document.createElement('span')
  let spanCheckMark = document.createElement('span')

  divTodo.classList.add('todo')
  divTodo.draggable = true

  spanDot.classList.add('dot')
  spanDot.setAttribute('onclick', 'toggleTodoCompleted(this)')
  spanClose.classList.add('close')
  spanClose.setAttribute('onclick', 'deleteTodo(this)')
  spanClose.classList.add('close')
  spanCheckMark.setAttribute('onclick', 'toggleTodoCompleted(this)')
  spanCheckMark.classList.add('check-mark')

  inputDescription.disabled = true
  inputDescription.type = "text"
  inputDescription.name = "task-description"
  inputDescription.value = newTodo.value

  spanDot.appendChild(spanCheckMark)
  divTodo.append(spanDot)
  divTodo.append(inputDescription)
  divTodo.append(spanClose)
  todoContainer.append(divTodo)
  setTodoDraggableBehaviour()
}

const createTodo = ( e ) => {
  e.preventDefault()
  if(checkInput()) {
    createNewTodoItem()
  }
}

const deleteTodo = ( todoItem ) => {
  todoContainer.removeChild(todoItem.parentNode)
}

const toggleTodoCompleted = ( todoItem ) => {
  todoItem.parentNode.classList.toggle('completed')
}

setDefaultPreferenceTheme()
setTodoDraggableBehaviour()