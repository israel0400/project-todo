import { Todo } from '../classes/todo.class.js';
import { todoList } from '../index.js';

//Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');

export const crearTodoHtml = (todo) => {

	const htmlTodo = `
	<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;

	divTodoList.append(div.firstElementChild);

	return div;

}

txtInput.addEventListener('keyup', (event) => {

	console.log(event);
	if(event.keyCode === 13 && txtInput.value.length > 0)
	{
		console.log('Nueva tarea ingresada ' + txtInput.value);
		const nuevoTodo = new Todo(txtInput.value);
		
		todoList.nuevoTodo(nuevoTodo);
		console.log(todoList);

		crearTodoHtml(nuevoTodo);

		txtInput.value = '';
	}

});

divTodoList.addEventListener('click', (event) => {
	
	const nombreElemento = event.target.localName;
	const todoElemento = event.target.parentElement.parentElement; //Trae el li
	const id = todoElemento.dataset.id;
	console.log(nombreElemento);
	if(nombreElemento == 'input')
	{
		todoList.marcarCompletado(id);
		todoElemento.classList.toggle('completed');
	}

	if(nombreElemento == 'button')
	{
		//console.log(todoElemento);
		todoList.eliminarTodo(id);
		todoElemento.remove();

		console.log(todoList);
	}
	
});

borrarCompletados.addEventListener('click', () =>{

 	for(let i = divTodoList.children.length-1; i >= 0; i--)
 	{
 		const elemento = divTodoList.children[i];
 		// console.log(elemento);
 		if( elemento.classList.contains('completed') )
 		{
 			elemento.remove();
 		}
 	}
	todoList.eliminarCompletados();
	console.log(todoList);

});

ulFilters.addEventListener('click', (event) => {
	console.log(event.target.text);
	const filtro = event.target.text;
	
	for(const elemento of divTodoList.children)
	{
		const completado = elemento.classList.contains('completed');

		switch(filtro)
		{
			case 'Completados':
				if(!completado)
				{
					elemento.classList.add('hidden');
				}else{
					elemento.classList.remove('hidden');
				}
			break;
			case 'Pendientes':
				if(completado)
				{
					elemento.classList.add('hidden');
				}else{
					elemento.classList.remove('hidden');
				}
			break;
			case 'Todos':
				elemento.classList.remove('hidden');
			break;
		}
	}
		
});