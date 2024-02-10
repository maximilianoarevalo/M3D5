// Arreglo inicial

let todoArray = [
    {
        id: 1,
        name: 'Hacer mercado',
        status: true
    },
    {
        id: 2,
        name: 'Estudiar para la prueba',
        status: false
    },
    {
        id: 3,
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
    // Se obtiene el nombre de la tarea
    let taskName = document.getElementById("input-name").value;

    // Si viene nulo el nombre de la tarea
    if(taskName === "" || taskName === null){
        alert("La tarea debe tener nombre.");
        return;
    }

    // Se obtiene el maximo id actual
    // Se ordena el array de manera ascendente por id y se obtiene el siguiente id a agregar
    todoArray.sort((a, b) => a.id - b.id);
    let actualId = todoArray.length > 0 ? todoArray[todoArray.length - 1].id + 1 : 1;

    // Se agrega la tarea
    todoArray.push({
        id: actualId,
        name: taskName,
        status: false
    })
    // se deja el valor en blanco -> ver si es mejor esto o hacer un refresh()
    document.getElementById("input-name").value = "";
    //aca se debe llamar al countTotalTask()
    // aca se debe llamar al countDoneTask()
    // aca se debe llamar al refresh de la pagina (ver si es automatico o se debe triggerear)
    // countDoneTask();
    countTotalTask(); //solo se llama el total, ya que las tareas se inicializan en false, no es necesario actualizar el done al crear una nueva
    showTaskItems();
}

// Funcion para obtener id de checkbox clickeado asociado a tarea
function getTaskId(checkbox, taskId) {
    // Agregar logica para tachas tareas hechas y destachar tareas sin terminar
    if (checkbox.checked) {
      todoArray.map((el) => {
        if (el.id == taskId) {
          el.status = true;

          // Se tachan las tareas realizadas
          var trIdAndName = document.getElementById(taskId);
          trIdAndName.cells[0].style.textDecoration = "line-through";
          trIdAndName.cells[1].style.textDecoration = "line-through";
        }
      });
    } else {
      todoArray.map((el) => {
        if (el.id == taskId) {
          el.status = false;
          
          // Se tachan las tareas realizadas
          var trIdAndName = document.getElementById(taskId);
          trIdAndName.cells[0].style.textDecoration = "none";
          trIdAndName.cells[1].style.textDecoration = "none";
        }
      });
    }
    countDoneTask();
    countTotalTask();
  }

// Funcion para eliminar tareas
function deleteTask(taskId){
  todoArray = todoArray.filter(el => {
    return el.id != taskId;
  })
  countDoneTask();
  countTotalTask();
  showTaskItems();
}

// Se muestran los elementos
function showTaskItems(){
    let list = document.getElementById("task-list-items");
    list.innerHTML = "";
    todoArray.forEach((el) => {
        // let textDecoration = el.status ? `<tr style="text-decoration:line-through;" id="${el.id}">` : `<tr id="${el.id}">`;
        // let checkBox = el.status ? `<input type="checkbox" checked onclick="getTaskId(this, ${el.id})">` : `<input type="checkbox" onclick="getTaskId(this, ${el.id})">`;
        // list.innerHTML += `${textDecoration} <td>${el.id}</td> <td>${el.name}</td> <td>${checkBox} <button style="margin-left: 90px;"onclick="deleteTask(${el.id})">Eliminar</button></td></tr>`
        let doneTask = el.status ? `style="text-decoration: line-through;"` : `style="text-decoration: none;"`;
        let checkBox = el.status ? `<input type="checkbox" checked onclick="getTaskId(this, ${el.id})">` : `<input type="checkbox" onclick="getTaskId(this, ${el.id})">`;
        list.innerHTML += `<tr id="${el.id}"> <td ${doneTask}>${el.id}</td> <td ${doneTask}>${el.name}</td> <td>${checkBox} <button style="margin-left: 90px;"onclick="deleteTask(${el.id})">Eliminar</button></td></tr>`
      })
    countDoneTask();
    countTotalTask();
}


// Llamado de funciones, hay que llamar al agregar o quitar tareas
countTotalTask();
countDoneTask();
showTaskItems();

