// Arreglo inicial

let todoArray = [
    {
        id: '1',
        name: 'Hacer mercado',
        status: true
    },
    {
        id: '2',
        name: 'Estudiar para la prueba',
        status: false
    },
    {
        id: '3',
        name: 'Sacar a pasear a Tobby',
        status: false
    }
]

// Funcion que cuenta las tareas totales
function countTotalTask(){
    let size = todoArray.length;
    let item = document.getElementById('task-total');
    item.innerHTML = `<div id="task-total" class="total">Total: <b>${size}</b></div>`;
}

// Funcion que cuenta las tareas finalizadas
function countDoneTask(){
    let doneCounter = 0;
    todoArray.forEach((el) => {
        if(el.status === true){
            doneCounter++;
        }
    })
    let item = document.getElementById('task-done');
    item.innerHTML = `<div id="task-done" class="done">Realizadas: <b>${doneCounter}<b></div>`;
}

// Agregar tarea
function addTask(){
    // Se obtiene el maximo id actual
    let actualId = -1; // TODO: separar como funcion **
    todoArray.forEach((el) => {
        if(parseInt(el.id) > actualId){
            actualId = parseInt(el.id) + 1;
        }
    }
    )
    // Se obtiene el nombre de la tarea
    let taskName = document.getElementById("input-name").value;
    todoArray.push({
        id: actualId,
        name: taskName,
        status: false
    })
    // se deja el valor en blanco -> ver si es mejor esto o hacer un refresh()
    document.getElementById("input-name").value = "";
    console.log(todoArray)
    // aca se debe llamar al countTotalTask()
    // aca se debe llamar al countDoneTask()
    // aca se debe llamar al refresh de la pagina (ver si es automatico o se debe triggerear)

}


// Se muestran los elementos
function showTaskItems(){
    let list = document.getElementById("task-list-items");
    todoArray.forEach((el) => {
        let checkBox = el.status ? `<input type="checkbox" checked>` : `<input type="checkbox" value="1">`;
        list.innerHTML += `<li>${el.id} ${el.name} ${checkBox}</li>`
    })
}


// Llamado de funciones, hay que llamar al agregar o quitar tareas
countTotalTask();
countDoneTask();
showTaskItems();

console.log(todoArray)