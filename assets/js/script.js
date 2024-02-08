// Arreglo inicial

let todoArray = [
    {
        id: '16',
        name: 'Hacer mercado',
        status: true
    },
    {
        id: '60',
        name: 'Estudiar para la prueba',
        status: false
    },
    {
        id: '24',
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


// Llamado de funciones, hay que llamar al agregar o quitar tareas
countTotalTask();
countDoneTask();