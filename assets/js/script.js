// Consideraciones de requerimientos: 
// 1 -> se agregan tareas al agregar el nombre y presionar el boton (se valida que la tarea tenga nombre)
// 2 -> al presionar boton borrar se elimina la tarea correspondiente
// 3 -> se cuenta el total de tareas al agregar o quitar tareas
// 4 -> al seleccionar la tarea como completada (clickeando el checkbox) se considera como hecha y su estilo cambia a texto tachado
// 5 -> se cuenta el total de tareas realizadas de manera dinamica
// 6 -> se define arreglo con 3 tareas iniciales

// Se define arreglo inicial de tareas
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

// Funcion que agrega tarea
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

    // Se setea el valor del input en blanco nuevamente
    document.getElementById("input-name").value = "";

    // Se actualizan contadores
    //solo se llama el total, ya que las tareas se inicializan en false, no es necesario actualizar el done al crear una nueva
    countTotalTask(); 
    showTaskItems();
}

// Funcion para obtener id de checkbox clickeado asociado a tarea
function getTaskId(checkbox, taskId) {
    // Si la tarea esta hecha:
    if (checkbox.checked) {
      todoArray.map((el) => {
        if (el.id == taskId) {
          el.status = true;

          // Se tachan las tareas realizadas y se agrega estilo
          var trIdAndName = document.getElementById(taskId);
          trIdAndName.cells[0].style.textDecoration = "line-through";
          trIdAndName.cells[1].style.textDecoration = "line-through";
        }
      });
    } else {
      // Si la tarea no esta hecha:
      todoArray.map((el) => {
        if (el.id == taskId) {
          el.status = false;
          
          // Se quita el estilo de tachado, ya que la tarea no estaria hecha
          var trIdAndName = document.getElementById(taskId);
          trIdAndName.cells[0].style.textDecoration = "none";
          trIdAndName.cells[1].style.textDecoration = "none";
        }
      });
    }

    // Se actualizan contadores
    countDoneTask();
    countTotalTask();
  }

// Funcion para eliminar tareas
function deleteTask(taskId){
  todoArray = todoArray.filter(el => {
    return el.id != taskId;
  })
  // Se actualizan contadores
  countDoneTask();
  countTotalTask();
  showTaskItems();
}

// Se muestran las tareas del arreglo
function showTaskItems(){
    let list = document.getElementById("task-list-items");
    list.innerHTML = "";
    todoArray.forEach((el) => {
        let doneTask = el.status ? `style="text-decoration: line-through;"` : `style="text-decoration: none;"`;
        let checkBox = el.status ? `<input type="checkbox" checked onclick="getTaskId(this, ${el.id})">` : `<input type="checkbox" onclick="getTaskId(this, ${el.id})">`;
        list.innerHTML += `<tr id="${el.id}"> <td ${doneTask}>${el.id}</td> <td ${doneTask}>${el.name}</td> <td>${checkBox} <button style="margin-left: 90px;"onclick="deleteTask(${el.id})">Eliminar</button></td></tr>`
      })
    // Se actualizan contadores
    countDoneTask();
    countTotalTask();
}

// Llamado inicial de funciones:
countTotalTask();
countDoneTask();
showTaskItems();

