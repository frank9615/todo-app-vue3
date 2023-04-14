import type Todo from "@/models/Todo";

export default class TodoService {
    public static TODO_LOCAL_STORGE_KEY = "todos";

    public static getTodos(): Todo[] {
        const todos = localStorage.getItem(this.TODO_LOCAL_STORGE_KEY);
        if (todos) {
            return JSON.parse(todos);
        }
        return [];
    }

    public static deleteTodoById(id: number): void {
        const todos: Todo[] = this.getTodos();
        const index = todos.findIndex((todo) => todo.id === id);
        todos.splice(index, 1);
        localStorage.setItem(this.TODO_LOCAL_STORGE_KEY, JSON.stringify(todos));
    }

    public static addTodo(todo: Todo): void {
        const todos: Todo[] = this.getTodos();
        if (todo.title !== '') {
            todos.push(todo);
            localStorage.setItem(this.TODO_LOCAL_STORGE_KEY, JSON.stringify(todos));
        }
    }

    public static getNextId(): number {
        const todos: Todo[] = this.getTodos();
        if (todos.length === 0) {
            return 1;
        }
        return todos[todos.length - 1].id + 1;
    }

    public static changeStatusTodoById(id: number, status: boolean): void {
        const todos: Todo[] = this.getTodos();
        const index = todos.findIndex((todo) => todo.id === id);
        todos[index].completed = !status;
        localStorage.setItem(this.TODO_LOCAL_STORGE_KEY, JSON.stringify(todos));
    }

    public static getTodoNotCompleted(): number {
        const todos: Todo[] = this.getTodos();
        return todos.filter((todo) => !todo.completed).length;
    }

    public static getTodosByStatus(status: string): Todo[] {
        const todos: Todo[] = this.getTodos();
        if (status === 'completed') {
            return todos.filter((todo) => todo.completed === true);

        } else if (status === 'notCompleted') {
            return todos.filter((todo) => todo.completed === false);
        }
        return todos;
    }







}
