<template>
    <h1 class="text-2xl font-bold mb-4">My Todo List</h1>
    <input type="text" v-model="newTodo.text" placeholder="Enter your todo here"
            class="border border-white/5 rounded py-2 px-3 w-full mb-4 relative -z-1 bg-inherit"
            @keyup.enter="addTodo" />
        <div v-if="showWarning" class="rounded bg-yellow-500 text-black py-2 px-3 w-full mb-4 relative -z-1">
            Please enter a todo!
        </div>

        <ul class="list-none flex flex-col">
            <li v-for="(todo, index) in todos" :key="index"
                class="mb-2 flex items-center justify-between bg-white/5 px-4 py-2 rounded">
                <div class="flex items-center">
                    <input type="checkbox" v-model="todo.done" @change="moveToDoneTodos(index, todo)" class="mr-2" />
                    <span>{{ todo.text }}</span>
                </div>
                <div class="flex items-center">
                    <button @click="editTodoAction(index, todo)"
                        class="w-10 h-10 px-4 py-2 bg-blue-500 hover:bg-blue-700 transition flex items-center justify-center mr-2 rounded-full">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button @click="deleteTodo(index)"
                        class="w-10 h-10 px-4 py-2 bg-red-500 hover:bg-red-700 transition flex items-center justify-center rounded-full">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        </ul>

        <h3 v-if="doneTodos.length > 0" class="text-xl font-bold mb-4">Done Todos</h3>
        <ul class="list-none flex flex-col">
            <li v-for="(todo, index) in doneTodos" :key="index"
                class="mb-2 flex items-center justify-between bg-white/5 px-4 py-2 rounded">
                <div class="flex items-center">
                    <input type="checkbox" v-model="todo.done" @change="moveToTodos(index, todo)" class="mr-2" />
                    <span>{{ todo.text }}</span>
                </div>
                <button @click="deleteTodo(index)"
                    class="w-10 h-10 rounded-full px-4 py-2 bg-red-500 hover:bg-red-700 transition flex items-center justify-center">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        </ul>
</template>

<script>
import {
    moveToDoneTodos,
    moveToTodos,
    deleteTodo,
    cancelEditTodo,
    saveEditedTodo,
} from "./todoHelper";

export default {
    components: {},
    data() {
        return {
            newTodo: { text: "" },
            todos: [],
            doneTodos: [],
            showModal: false,
            editedTodo: { text: "" },
            showWarning: false,
        };
    },
    methods: {
        addTodo() {
            if (this.newTodo.text.trim() === "") {
                this.showWarning = true;
                setTimeout(() => {
                    this.showWarning = false;
                }, 3000);
                return;
            }
            this.todos.push({ text: this.newTodo.text, done: false });
            this.newTodo.text = ""
        },
        moveToDoneTodos,
        moveToTodos,
        editTodoAction(index, todo) {
            Swal.fire({
                title: "Edit Todo",
                text: "Enter the new text for the todo",
                icon: "question",
                input: "text",
                inputValue: todo.text,
                showCancelButton: true,
                confirmButtonText: "Update",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.value) {
                    todo.text = result.value;
                    this.todos.splice(index, 1, todo);
                }
            });
        },

        deleteTodo(index) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.value) {
                    this.todos.splice(index, 1);
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            });
        },
        cancelEditTodo,
        saveEditedTodo,
    },
};
</script>