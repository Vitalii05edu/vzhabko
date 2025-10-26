const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = JSON.parse(localStorage.getItem('todos-list')) || [];

let id = parseInt(localStorage.getItem('todos-next-id'), 10) || 100;

function saveTodos() {
  localStorage.setItem('todos-list', JSON.stringify(todos));
  localStorage.setItem('todos-next-id', id.toString());
}

function updateCount() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo=>!todo.checked).length;
}

function newTodo() {
  let text = prompt('enter todo');
  let todo = {id: id++, text, checked: false}
  todos.push(todo);
  render();
  saveTodos();
}

function render() {
  list.innerHTML = todos.map(todo=>renderTodo(todo)).join('');
  updateCount();
}

function renderTodo(todo){
  const todoClass = todo.checked ? 'text-success text-decoration-line-through' : '';
  return `
        <li class="list-group-item">
          <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onChange="checkTodo(${todo.id})"/>
          <label for="${todo.id}"> <span class="${todoClass}">${todo.text}</span></label>
          <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
        </li>
  `
}

function deleteTodo(id){
  todos = todos.filter(todo => todo.id !== id);
  render();
  saveTodos();
}

function checkTodo(id) {
  const toggle = todos.find(todo => todo.id === id);
  if (toggle) {
    toggle.checked = !toggle.checked;
  }
  render();
  saveTodos();
}

render();
