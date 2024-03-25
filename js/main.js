const todoContainer = document.querySelector('#todo_container')
const themeIcon = document.getElementById('theme-icon')
const themeToggle = document.getElementById('theme')
const qntyTodosOnPage = document.getElementById('todos-on-page')
const showAllTodos = document.getElementById('all-todos')
const showCompletedTodos = document.getElementById('completed-todos')
const showActiveTodos = document.getElementById('active-todos')
const clearCompletedTodos = document.getElementById('clear-completed-todos')
const newTodo = document.getElementById('new_todo')
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let todoItems = document.querySelectorAll('.todo')
let localStorageTheme = localStorage.getItem("theme");
let count = 0
let todos = [
  {
    id: count,
    checked: false,
    description: "Algo para mostrar 1"
  },
]

count ++

todos.push({
    id: count,
    checked: false,
    description: "Algo para mostrar 2"
})

count ++
// {
//   1: {
//     checked: 'true',
//     description: 'Algo para hacer actualmente'
//   },

// }



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
      themeIcon.src = "../images/icon-moon.svg"
    } else if (!themeToggle.checked) {
      themeIcon.src = "../images/icon-sun.svg"
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
      themeIcon.src = "../images/icon-sun.svg"
      themeToggle.checked = false
    }
    else if(localStorageTheme && localStorageTheme == 'light') {
      themeIcon.src = "../images/icon-moon.svg"
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

const cleanInput = () => {
  newTodo.value = ""
}

const createNewTodoItem = ( id, checked, description ) => {
  let divTodo = document.createElement('div')
  let inputDescription = document.createElement('input')
  let spanDot = document.createElement('span')
  let spanClose = document.createElement('span')
  let spanCheckMark = document.createElement('span')

  divTodo.classList.add('todo')
  divTodo.id = id
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
  inputDescription.value = description

  spanDot.appendChild(spanCheckMark)
  divTodo.append(spanDot)
  divTodo.append(inputDescription)
  divTodo.append(spanClose)
  todoContainer.append(divTodo)
  if(checked)
    divTodo.classList.toggle('completed')
  setTodoDraggableBehaviour()
  qntyTodosOnPage.innerText = todoContainer.childNodes.length
}

const createTodo = ( e ) => {
  e.preventDefault()
  if(checkInput()) {
    todos.push({id: count, checked: false, description: newTodo.value})
    createNewTodoItem(count, false, newTodo.value)
    count ++
    cleanInput()
  }
}

const deleteTodo = ( todoItem ) => {
  todoContainer.removeChild(todoItem.parentNode)
}

const deleteTodoAtPosition = ( todoItemPosition ) => {
  todoContainer.removeChild()
}

const toggleTodoCompleted = ( todoItem ) => {
  todoItem.parentNode.classList.toggle('completed')
  if(todoItem.parentNode.classList.contains('completed')) {
    todos.forEach( todo => {
      if( todo.id == todoItem.parentNode.id ) {
        todo.checked = !todo.checked
      }
    })
  }else {
    todos.forEach( todo => {
      if( todo.id == todoItem.parentNode.id )
        todo.checked = false
    })
    
  }
}

const deleteAllChildren = () => {
  while(todoContainer.lastChild) {
    todoContainer.removeChild(todoContainer.lastChild)
  }
}

const showTodos = ( items ) => {
  deleteAllChildren()
  if(items.length <= 0) {
    qntyTodosOnPage.innerText = todoContainer.childNodes.length
    return
  }
  items.forEach((todo) => {
    createNewTodoItem(todo.id, todo.checked, todo.description)
  })
}

showAllTodos.addEventListener('click', () => {
  showTodos(todos)
})

showActiveTodos.addEventListener('click', () => {
  const activeTodos = todos.filter( todo => !todo.checked)
  showTodos(activeTodos)
})

showCompletedTodos.addEventListener('click', () => {
  const completedTodos = todos.filter( todo => todo.checked)
  showTodos(completedTodos)
})

clearCompletedTodos.addEventListener('click', () => {
  todos = todos.filter( todo => !todo.checked)
  showTodos(todos)
})

showTodos(todos)
setDefaultPreferenceTheme()
setTodoDraggableBehaviour()