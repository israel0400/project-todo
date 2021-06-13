import './css/components.css';
import './css/styles.css';

// import { Todo } from './classes/todo.class.js';
import { TodoList } from './classes/todo-list.class.js';
import { crearTodoHtml } from './js/components.js';

export const todoList = new TodoList(); //Si no se exporta al llamar a la clase se reinicia el arreglo

console.log(todoList.todos);

todoList.todos.forEach( todo => crearTodoHtml(todo) );

// const tarea = new Todo('HTML');
// todoList.nuevoTodo( tarea );
// console.log(todoList);
// crearTodoHtml(tarea);