// todoHelper.js
export function moveToDoneTodos(index, todo) {
  this.todos.splice(index, 1);
  this.doneTodos.push(todo);
}

export function moveToTodos(index, todo) {
  this.doneTodos.splice(index, 1);
  this.todos.push(todo);
}

export function deleteTodo(index) {
  this.todos.splice(index, 1);
}

export function cancelEditTodo() {
  this.showModal = false;
  this.editedTodo = { text: "" };
}

export function saveEditedTodo() {
  this.editedTodo.text = swal.getContent().value;
  if (this.editedTodo.text.trim() === "") {
    return;
  }
  this.editTodo(this.editIndex, this.editedTodo);
  this.editedTodo = { text: "" };
}
