<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckBox from '@/components/BaseCheckBox.vue';
import { onMounted, ref } from 'vue';
import type Todo from '@/models/Todo';
import TodoService from '../services/TodoService';

const todos = ref<Todo[]>([]);
const newTodo = ref(<Todo>{});
const todoTitle = ref("");
const disabledButton = ref(false);
const checkFilter = ref([]);
const checkStatus = ref(false);

const deleteTodo = (id: number) => {
    TodoService.deleteTodoById(id);
    loadTodos();
};

const saveTodos = () => {
    newTodo.value = {
        id: TodoService.getNextId(),
        title: todoTitle.value,
        completed: false
    };
    todoTitle.value = "";
    TodoService.addTodo(newTodo.value);
    loadTodos();
};

const filterTodos = (value: any) => {
    if (value.checked === true) {
        todos.value = TodoService.getTodosByStatus(value.value)
    } else {
        loadTodos();
    }
};

const loadTodos = () => {
    todos.value = TodoService.getTodos();
};

onMounted(() => {
    loadTodos();
});


const clickButton = () => {
    saveTodos();
}

const onChangeText = (text: string) => {
    if (text === '') {
        disabledButton.value = true;
    } else {
        disabledButton.value = false;
    }
}

const onChangeCompleted = (idTodo: number, completed: boolean) => {
    TodoService.changeStatusTodoById(idTodo, completed);
    loadTodos();

}

</script>

<template>
    <div class="flex justify-center">
        <div class="m-auto">
            <h1 class="text-3xl font-bold mb-4">TODOS LIST</h1>
            <base-input v-model="todoTitle" @input="onChangeText" class="mb-4"></base-input>
            <base-button :type="'solid'" :disabled="disabledButton" @click="clickButton" class="mb-4">
                <template #textButton>
                    <b>Aggiungi</b>
                </template>
            </base-button>
            <div class="py-3">
                <div class="py-1">
                    <b class="p-3">Completate</b>
                    <base-check-box v-model="checkFilter" value="completed" @checked="filterTodos"
                        class="mr-2"></base-check-box>
                    <b class="p-3">Non completate</b>
                    <base-check-box v-model="checkFilter" value="notCompleted" @checked="filterTodos"
                        class="mr-2"></base-check-box>
                </div>
            </div>
            <hr class="my-2">
            <div v-for="todo in todos" :key="todo.id" class="flex items-center space-x-4">
                <base-check-box v-model="checkStatus" :value="todo.completed"
                    @input="onChangeCompleted(todo.id, todo.completed)" class="text-blue-500">
                </base-check-box>
                <p :class="{ 'line-through': todo.completed }" class="flex-grow">{{ todo.title }}</p>
                <button @click="deleteTodo(todo.id)" class="flex items-center text-red-500 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>


            <hr class="my-4" v-if="todos.length > 0">
            <div class="text-center">
                <div class="py-1">
                    {{ TodoService.getTodoNotCompleted() }} da completare
                </div>
            </div>
        </div>
    </div>
</template>